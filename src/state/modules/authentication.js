import { toRaw } from "@vue/reactivity";
import { AuthenticationApi } from "@/services";
import LocalStorage from "@/helpers/LocalStorage";

const authLocalStorage = new LocalStorage("auth");
const jwtStorage = new LocalStorage("jwt");
const authenticationService = new AuthenticationApi();
export const state = {
    authorizedUser: authLocalStorage.get() || null,
    activedCluster: "",
    authorized: false,
    error: null,
    loading: true,
    oauth: null,
};

export const mutations = {
    SET_AUTHORIZED_USER(state, newValue) {
        Object.assign(state, {
            loading: false,
            authorized: true,
            error: null,
            ...newValue,
        });
        authLocalStorage.save(newValue);
    },
    SET_OAUTH(state, newValue) {
        if (newValue && newValue.token) {
            const newOauth = newValue;
            Object.assign(state, {
                oauth: newOauth,
            });
        }
    },
    SET_CLUSTER(state, newValue) {
        Object.assign(state, {
            loading: false,
            activedCluster: newValue,
        });
    },
    SET_READY(state, newValue) {
        Object.assign(state, {
            loading: newValue,
            error: null,
        });
    },
    SET_LOGOUT(state, { finishedFn } = {}) {
        Object.assign(state, {
            authorized: false,
            error: null,
            loading: true,
            oauth: null,
            authorizedUser: null,
        });
        authLocalStorage.clear();
        jwtStorage.clear();
        if (typeof finishedFn === "function") {
            finishedFn.call();
        }
    },
    SET_ERROR(state, { error, loading }) {
        Object.assign(state, {
            error,
            loading,
        });
    },
};

export const getters = {
    loading: (state) => toRaw(state.loading),
    authorized: (state) => toRaw(state.authorized),
    authorizedUser: (state) => toRaw(state.authorizedUser),
    error: (state) => toRaw(state.error),
};

export const actions = {
    init({ dispatch }) {
        dispatch("validate");
    },
    login({ commit, dispatch, getters }, payload) {
        if (getters.authorized) return dispatch("validate");
        commit("SET_READY", true);
        const { username, password } = payload;
        authenticationService
            .login(username, password)
            .then(([error, result]) => {
                if (error) {
                    commit("SET_ERROR", {
                        loading: false,
                        error: error,
                    });
                } else {
                    const resultData = result.data;
                    commit("SET_AUTHORIZED_USER", {
                        authorizedUser: {
                            username: resultData.username,
                            email: resultData.email,
                        },
                    });
                }
            });
    },
    // Logs out the current user.
    logout({ commit }, payload) {
        authenticationService.logout((error) => {});
        commit("SET_LOGOUT", { finishedFn: payload.finishedFn });
    },
    validate({ commit }) {
        const authorizedUser = authLocalStorage.get("authorizedUser");
        if (authorizedUser && authorizedUser.authorizedUser) {
            commit("SET_AUTHORIZED_USER", { ...authorizedUser });
            return authorizedUser;
        } else {
            commit("SET_ERROR", {
                loading: false,
                error: null,
            });
            return Promise.resolve(null);
        }
    },
    setErrors({ commit }, payload) {},
};
