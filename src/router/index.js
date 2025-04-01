import { createWebHistory, createRouter } from "vue-router";
import store from "@/state/store";
import routes from "./routes";
import appConfig from "../../app.config";

const router = createRouter({
    history: createWebHistory(),
    routes,
    // Use the HTML5 history API (i.e. normal-looking routes)
    // instead of routes with hashes (e.g. example.com/#/about).
    // This may require some server configuration in production:
    // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
    mode: "history",
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0, left: 0 };
        }
    },
});

// Before each route evaluates...
router.beforeEach(async (routeTo, routeFrom, next) => {
    if (routeTo.name) {
        const authRequired = routeTo.matched.some(
            (route) => route.meta.authRequired
        );

        if (!authRequired) return next();

        store.dispatch("authentication/init");
        if (store.getters["authentication/authorized"]) {
            next();
        } else {
            next({
                name: "login",
                query: { redirectFrom: routeTo.fullPath },
            });
        }
    } else {
        next({
            name: "404",
            query: { redirectFrom: routeTo.fullPath },
        });
    }
});

router.beforeResolve(async (routeTo, routeFrom, next) => {
    // Create a `beforeResolve` hook, which fires whenever
    // `beforeRouteEnter` and `beforeRouteUpdate` would. This
    // allows us to ensure data is fetched even when params change,
    // but the resolved route does not. We put it in `meta` to
    // indicate that it's a hook we created, rather than part of
    // Vue Router (yet?).
    try {
        // For each matched route...
        for (const route of routeTo.matched) {
            await new Promise((resolve, reject) => {
                // If a `beforeResolve` hook is defined, call it with
                // the same arguments as the `beforeEnter` hook.
                store.dispatch("authentication/init");
                if (
                    routeTo.name === "login" &&
                    store.getters["authentication/authorized"]
                ) {
                    next({
                        name: "dashboard",
                    });
                } else {
                    if (route.meta && route.meta.beforeResolve) {
                        route.meta.beforeResolve(
                            routeTo,
                            routeFrom,
                            (...args) => {
                                // If the user chose to redirect...
                                if (args.length) {
                                    // If redirecting to the same route we're coming from...
                                    // Complete the redirect.
                                    next(...args);
                                    reject(new Error("Redirected"));
                                } else {
                                    resolve();
                                }
                            }
                        );
                    } else {
                        // Otherwise, continue resolving the route.
                        resolve();
                    }
                }
            });
        }
        // If a `beforeResolve` hook chose to redirect, just return.
    } catch (error) {
        return;
    }
    document.title = routeTo.meta.title + " | " + appConfig.title;
    // If we reach this point, continue resolving the route.
    next();
});

export default router;
