import { mapState, mapGetters, mapActions } from "vuex";

export const authComputed = {
    ...mapState("auth", {
        currentUser: (state) => state.currentUser,
    }),
    ...mapGetters("auth", ["loggedIn"]),
};

export const layoutComputed = {
    ...mapState("layout", {
        layout: (state) => state.layout,
        sidebarColor: (state) => state.sidebarColor,
        sidebarSize: (state) => state.sidebarSize,
        mode: (state) => state.mode,
        cardLayout: (state) => state.cardLayout,
        layoutWidth: (state) => state.layoutWidth,
        position: (state) => state.position,
        topbar: (state) => state.topbar,
        topbarImage: (state) => state.topbarImage,
        preloader: (state) => state.preloader,
        layoutMenuData: (state) => state.layoutMenuData,
    }),
};

export const authMethods = mapActions("auth", [
    "logIn",
    "logOut",
    "register",
    "resetPassword",
]);

export const layoutMethods = mapActions("layout", [
    "changeLayout",
    "changeSidebarColor",
    "changeSidebarSize",
    "changeMode",
    "changeCardLayout",
    "changeLayoutWidth",
    "changePosition",
    "changeTopbar",
    "changeTopbarImage",
    "changePreloader",
    "changeMenudata",
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
