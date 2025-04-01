import { mapState, mapActions } from "vuex";

export const layoutComputed = {
    ...mapState("layout", {
        layoutType: (state) => state.layoutType,
        sidebarSize: (state) => state.sidebarSize,
        layoutWidth: (state) => state.layoutWidth,
        topbar: (state) => state.topbar,
        mode: (state) => state.mode,
        position: (state) => state.position,
        sidebarView: (state) => state.sidebarView,
        sidebarColor: (state) => state.sidebarColor,
        sidebarImage: (state) => state.sidebarImage,
        visibility: (state) => state.visibility,
        bodybg: (state) => state.bodybg,
        layoutTheme: (state) => state.layoutTheme,
        themeColor: (state) => state.themeColor,
    }),
};

export const authMethods = mapActions("auth", [
    "logIn",
    "logOut",
    "register",
    "resetPassword",
]);

export const layoutMethods = mapActions("layout", [
    "changeLayoutType",
    "changeLayoutWidth",
    "changeSidebarSize",
    "changeTopbar",
    "changeMode",
    "changePosition",
    "changeSidebarView",
    "changeSidebarColor",
    "changeSidebarImage",
    "changePreloader",
    "changeVisibility",
    "changeBodybg",
    "changeThemes",
    "changeThemesColor",
]);

export const authFackMethods = mapActions("authfack", [
    "login",
    "registeruser",
    "logout",
]);

export const notificationMethods = mapActions("notification", [
    "success",
    "error",
    "clear",
]);
