import store from "@/state/store";

export default [
    {
        path: "/",
        name: "dashboard",
        meta: {
            title: "Dashboard",
            authRequired: true,
        },
        component: () => import("../views/dashboard/index.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/account/login.vue"),
        meta: {
            title: "Login",
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters["authentication/authorized"]) {
                    // Redirect to the home page instead
                    next({ name: "dashboard" });
                    next();
                } else {
                    // Continue to the login page
                    next();
                }
            },
        },
    },
];
