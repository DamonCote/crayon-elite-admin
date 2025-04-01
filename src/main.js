import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import AOS from "aos";
import "aos/dist/aos.css";
import i18n from "./i18n";
import store from "./state/store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

import BootstrapVueNext from "bootstrap-vue-next";

import vClickOutside from "click-outside-vue3";
import { vMaska } from "maska";

import VueFeather from "vue-feather";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "./scss/master.scss";
import "bootstrap/dist/js/bootstrap.bundle";

const app = createApp(App);

AOS.init({
    easing: "ease-out-back",
    duration: 1000,
});

app.use(store)
    .use(router)
    .use(BootstrapVueNext)
    .use(Antd)
    .component(VueFeather.type, VueFeather)
    .directive("maska", vMaska)
    .use(i18n)
    .use(vClickOutside)
    .mount("#app");
