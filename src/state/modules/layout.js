export const state = {
    layout: "vertical",
    sidebarColor: "light",
    sidebarSize: "lg",
    mode: "light",
    cardLayout: "borderless",
    layoutWidth: "boxed",
    position: "fixed",
    topbar: "dark",
    topbarImage: "pattern-1",
    preloader: "disable",
    layoutMenuData: [],
};

export const mutations = {
    CHANGE_LAYOUT(state, layout) {
        state.layout = layout;
    },
    CHANGE_SIDEBAR_COLOR(state, sidebarColor) {
        state.sidebarColor = sidebarColor;
    },
    CHANGE_SIDEBAR_SIZE(state, sidebarSize) {
        state.sidebarSize = sidebarSize;
    },
    CHANGE_MODE(state, mode) {
        state.mode = mode;
    },
    CHANGE_CARD_LAYOUT(state, cardLayout) {
        state.cardLayout = cardLayout;
    },
    CHANGE_LAYOUT_WIDTH(state, layoutWidth) {
        state.layoutWidth = layoutWidth;
    },
    CHANGE_POSITION(state, position) {
        state.position = position;
    },
    CHANGE_TOPBAR(state, topbar) {
        state.topbar = topbar;
    },
    CHANGE_TOPBAR_IMAGE(state, topbarImage) {
        state.topbarImage = topbarImage;
    },
    CHANGE_PRELOADER(state, preloader) {
        state.preloader = preloader;
    },
    CHANGE_MENUDATA(state, layoutMenuData) {
        state.layoutMenuData = layoutMenuData;
    },
};

export const actions = {
    changeLayout({ commit }, { layout }) {
        commit("CHANGE_LAYOUT", layout);
    },
    changeSidebarColor({ commit }, { sidebarColor }) {
        commit("CHANGE_SIDEBAR_COLOR", sidebarColor);
    },
    changeSidebarSize({ commit }, { sidebarSize }) {
        commit("CHANGE_SIDEBAR_SIZE", sidebarSize);
    },
    changeMode({ commit }, { mode }) {
        commit("CHANGE_MODE", mode);
    },

    changeCardLayout({ commit }, { cardLayout }) {
        commit("CHANGE_CARD_LAYOUT", cardLayout);
    },

    changeLayoutWidth({ commit }, { layoutWidth }) {
        commit("CHANGE_LAYOUT_WIDTH", layoutWidth);
    },
    changePosition({ commit }, { position }) {
        commit("CHANGE_POSITION", position);
    },

    changeTopbar({ commit }, { topbar }) {
        commit("CHANGE_TOPBAR", topbar);
    },

    changeTopbarImage({ commit }, { topbarImage }) {
        commit("CHANGE_TOPBAR_IMAGE", topbarImage);
    },

    changePreloader({ commit }, { preloader }) {
        commit("CHANGE_PRELOADER", preloader);
    },

    changeMenudata({ commit }, { layoutMenuData }) {
        commit("CHANGE_MENUDATA", layoutMenuData);
    },
};
