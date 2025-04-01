/*
 * UseStore:Store class
 */
import { toRaw } from "@vue/reactivity";
class UseStore {
    constructor(apiServices, formatter) {
        this._apiServices = apiServices;
        this._formatter = formatter;
    }
    init() {
        const { _apiServices, _formatter } = this;
        // action types
        const GET_LIST = "loadList";
        const REFRESH_LIST = "refreshList";
        const GET_DETAIL = "loadDetail";
        const UPDATE_PAGER = "updatePagination";
        // mutation types
        const SET_LIST = "setList";
        const SET_DETAIL = "setDetail";
        const SET_DETAIL_READY = "setDetailReady";
        const SET_PAGER = "setPagination";
        const SET_READY = "setReady";
        const SET_ERROR = "setError";
        // pagination settings
        const PAGE_SIZE = 10;
        const PAGE_MODEL = {
            current: 1,
            pageSize: PAGE_SIZE,
            rankIndex: "",
        };

        const state = {
            list: [],
            detail: {},
            pagination: {
                ...PAGE_MODEL,
            },
            paginationer: null,
            loading: true,
            turnLoading: true,
            refreshLoading: true,
            detailLoading: true,
            error: null,
        };
        const getters = {
            detail(state) {
                if (
                    !state.detailLoading &&
                    _formatter &&
                    typeof _formatter.detail === "function"
                ) {
                    return _formatter.detail(toRaw(state.detail));
                } else {
                    return toRaw(state.detail);
                }
            },
            list(state) {
                return toRaw(state.list);
            },
            newList(state) {
                if (
                    !state.loading &&
                    _formatter &&
                    typeof _formatter.newList === "function"
                ) {
                    return _formatter.newList(toRaw(state.list));
                } else {
                    return toRaw(state.list);
                }
            },
            paginationer(state) {
                const loading = toRaw(state.loading);
                if (!loading) {
                    return toRaw(state.pagination);
                } else {
                    return false;
                }
            },
            loading(state) {
                return toRaw(state.loading);
            },
            refreshLoading(state) {
                return toRaw(state.refreshLoading);
            },
            detailLoading(state) {
                return toRaw(state.detailLoading);
            },
            error(state) {
                return toRaw(state.error);
            },
        };
        const actions = {
            async [REFRESH_LIST]({ commit }, payload) {
                const params = Object.assign(
                    {
                        offset: 0,
                        limit: PAGE_SIZE,
                    },
                    payload
                );
                commit(SET_PAGER, payload);
                commit(SET_READY, {
                    refreshLoading: true,
                });

                const [error, result] = await _apiServices.list(params);
                if (error) {
                    commit(SET_ERROR, {
                        refreshLoading: false,
                        error,
                    });
                } else {
                    commit(SET_LIST, result);
                    commit(SET_READY, {
                        refreshLoading: false,
                    });
                }
            },
            async [GET_LIST]({ commit }, payload, actionType = "") {
                const params = Object.assign(
                    {
                        offset: 0,
                        limit: PAGE_SIZE,
                    },
                    payload
                );
                commit(SET_PAGER, payload);

                if (actionType === "turnpage") {
                    commit(SET_READY, {
                        turnLoading: true,
                    });
                } else {
                    commit(SET_READY, {
                        loading: true,
                        turnLoading: true,
                    });
                }

                const [error, result] = await _apiServices.list(params);

                if (error) {
                    commit(SET_ERROR, {
                        loading: false,
                        error,
                    });
                } else {
                    commit(SET_LIST, result);
                    commit(SET_READY, {
                        loading: false,
                        turnLoading: false,
                    });
                }
            },
            async [GET_DETAIL]({ commit }, payload) {
                const { id, refresh, params = null } = payload || {};
                if (!refresh) {
                    commit(SET_DETAIL_READY, true);
                }
                const [error, result] = await _apiServices.detail(id, params);
                if (error) {
                    commit(SET_ERROR, {
                        detailLoading: false,
                        error,
                    });
                } else {
                    if (result.status) {
                        commit(SET_DETAIL, result.data);
                    } else {
                        commit(SET_ERROR, {
                            detailLoading: false,
                            error: result,
                        });
                    }
                }
            },
            [UPDATE_PAGER](context, payload) {
                const { pageSize, current } = payload;
                const offset = pageSize * (current - 1);
                delete payload.pageSize;
                delete payload.current;
                payload.offset = offset;
                payload.limit = pageSize;
                actions[GET_LIST](context, payload, "turnpage");
            },
        };
        const mutations = {
            [SET_DETAIL](state, detail) {
                Object.assign(state, {
                    detail,
                    loading: false,
                    detailLoading: false,
                    error: null,
                });
            },
            [SET_PAGER](state, payload) {
                if (payload) {
                    const { orderby, sort, filter, limit } = payload;
                    const offset = payload.offset || 0;
                    const pageCurrent = offset / limit + 1;

                    const pagination = Object.assign(PAGE_MODEL, {
                        current: pageCurrent || 1,
                        pageSize: limit || PAGE_SIZE,
                        orderby: orderby,
                        sort: sort,
                        filter,
                    });
                    Object.assign(state, {
                        pagination,
                    });
                }
            },
            [SET_ERROR](state, payload) {
                const { loading, error } = payload;
                Object.assign(state, {
                    loading,
                    error,
                });
            },
            [SET_DETAIL_READY](state, isReady) {
                Object.assign(state, {
                    detailLoading: isReady,
                    detail: null,
                    error: null,
                });
            },
            [SET_READY](state, readyOpts) {
                Object.assign(state, {
                    ...readyOpts,
                    error: null,
                });
            },
            [SET_LIST](state, response) {
                const { data, total: total } = response;
                Object.assign(state, {
                    list: data,
                });
                const pagination = toRaw(state.pagination);
                if (total <= pagination.pageSize) {
                    Object.assign(state, {
                        paginationer: null,
                    });
                } else {
                    const { current, pageSize } = pagination;
                    const startOffset = (current - 1) * pageSize + 1;
                    const endOffset = (() => {
                        const endIndex = startOffset + pageSize - 1;
                        return endIndex > total ? total : endIndex;
                    })();

                    Object.assign(state, {
                        pagination: {
                            total: total,
                            ...state.pagination,
                        },
                        paginationer: {
                            total: total,
                            ...state.pagination,
                            rankIndex: `${startOffset}-${endOffset}`,
                        },
                    });
                }
            },
        };

        return {
            state,
            actions,
            mutations,
            getters,
        };
    }
}

export default UseStore;
