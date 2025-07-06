<script>
import simplebar from "simplebar-vue";
import i18n from "../i18n";
import usFlag from "@/assets/images/flags/us.svg";
import helper from "../mixins/helper.mixin";
import { layoutMethods, layoutComputed } from "@/state/helpers";
import horMenu from "./menu";
// import store from '@/state/store';

export default {
    mixins: [helper],
    data() {
        return {
            languages: [
                {
                    flag: usFlag,
                    language: "en",
                    title: "English",
                },
            ],
            lan: i18n.locale,
            text: null,
            flag: null,
            newMemus: horMenu,
        };
    },
    computed: {
        ...layoutComputed,
        layout: {
            get() {
                return this.$store ? this.$store.state.layout.layout : {} || {};
            },
        },
        sidebarSize: {
            get() {
                return this.$store
                    ? this.$store.state.layout.sidebarSize
                    : {} || {};
            },
            set(size) {
                this.changeSidebarSize({ sidebarSize: size });
            },
        },
    },
    beforeCreate() {
        let pageTopbar = document.getElementById("page-topbar");
        if (pageTopbar) {
            document.body.scrollTop >= 20 ||
            document.documentElement.scrollTop >= 20
                ? pageTopbar.classList.add("topbar-shadow")
                : pageTopbar.classList.remove("topbar-shadow");
        }
    },
    mounted() {
        this.setupHorizontalMenu("2");
        // active menu
        this.initActiveMenu();

        // on window scroll topbar class add
        var This = this;
        document.addEventListener(
            "scroll",
            function () {
                This.windowScroll();
            },
            This
        );

        window.addEventListener(
            "load",
            function () {
                This.initActiveMenu();
                if (window.scrollY > 0) This.windowScroll();
            },
            This
        );

        this.flag = "en";
        this.languages.forEach((item) => {
            if (item.language == this.flag) {
                document
                    .getElementById("header-lang-img")
                    .setAttribute("src", item.flag);
            }
        });

        window.addEventListener("resize", this.windowResizeHover);

        document.body.addEventListener("click", function (event) {
            if (!event.target.closest("#navbar-header")) {
                document.body.classList.remove("menu");
                document.body.classList.remove("vertical-sidebar-enable");
            }
        });

        if (document.getElementById("topnav-hamburger-icon"))
            document
                .getElementById("topnav-hamburger-icon")
                .addEventListener("click", this.toggleHamburgerMenu);
    },
    methods: {
        ...layoutMethods,

        initActiveMenu() {
            var currentPath = location.pathname;
            if (currentPath) {
                var a = document
                    .getElementById("navbar-nav")
                    .querySelector('[href="' + currentPath + '"]');
                if (a) {
                    a.classList.add("active");
                    var parentCollapseDiv = a.closest(
                        ".collapse.menu-dropdown"
                    );
                    if (parentCollapseDiv) {
                        parentCollapseDiv.classList.add("show");
                        parentCollapseDiv.parentElement.children[0].classList.add(
                            "active"
                        );
                        parentCollapseDiv.parentElement.children[0].setAttribute(
                            "aria-expanded",
                            "true"
                        );
                        if (
                            parentCollapseDiv.parentElement.closest(
                                ".collapse.menu-dropdown"
                            )
                        ) {
                            parentCollapseDiv.parentElement
                                .closest(".collapse")
                                .classList.add("show");
                            if (
                                parentCollapseDiv.parentElement.closest(
                                    ".collapse"
                                ).previousElementSibling
                            )
                                parentCollapseDiv.parentElement
                                    .closest(".collapse")
                                    .previousElementSibling.classList.add(
                                        "active"
                                    );

                            if (
                                parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(
                                    ".collapse.menu-dropdown"
                                )
                            ) {
                                parentCollapseDiv.parentElement.parentElement.parentElement.parentElement
                                    .closest(".collapse")
                                    .classList.add("show");
                                if (
                                    parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.closest(
                                        ".collapse"
                                    ).previousElementSibling
                                ) {
                                    parentCollapseDiv.parentElement.parentElement.parentElement.parentElement
                                        .closest(".collapse")
                                        .previousElementSibling.classList.add(
                                            "active"
                                        );
                                    // if ((document.documentElement.getAttribute("data-layout") == "horizontal") && parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.closest(".collapse")) {
                                    parentCollapseDiv.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
                                        .closest(".collapse")
                                        .previousElementSibling.classList.add(
                                            "active"
                                        );
                                    // }
                                }
                            }
                        }
                    }
                }
            }
        },
        windowScroll() {
            let pageTopbar = document.getElementById("page-topbar");
            if (pageTopbar) {
                document.body.scrollTop >= 20 ||
                document.documentElement.scrollTop >= 20
                    ? pageTopbar.classList.add("topbar-shadow")
                    : pageTopbar.classList.remove("topbar-shadow");
            }
        },
        setLanguage(locale, country, flag) {
            this.lan = locale;
            this.text = country;
            this.flag = flag;
            document
                .getElementById("header-lang-img")
                .setAttribute("src", flag);
            i18n.global.locale = locale;

            this.setupHorizontalMenu("1");
        },

        windowResizeHover() {
            var windowSize = document.documentElement.clientWidth;
            // const navbarMenu = document.querySelector(".navbar-menu");
            if (windowSize < 1025 && windowSize > 767) {
                // if (navbarMenu) {
                //     navbarMenu.innerHTML = navbarMenuHTML;
                // }
                // isCollapseMenu();
                // initActiveMenu();

                if (this.layout == "vertical") {
                    document.documentElement.setAttribute(
                        "data-sidebar-size",
                        "sm-hover"
                    );
                }

                if (document.querySelector(".hamburger-icon")) {
                    document
                        .querySelector(".hamburger-icon")
                        .classList.add("open");
                }
            } else if (windowSize >= 1025) {
                // if (this.layout == "horizontal") {
                //     this.updateHorizontalMenus("2");
                // }

                if (document.querySelector(".hamburger-icon")) {
                    document
                        .querySelector(".hamburger-icon")
                        .classList.remove("open");
                }

                // if (this.layout == "vertical") {
                //     document.documentElement.setAttribute("data-sidebar-size", sessionStorage.getItem("data-sidebar-size"));
                // }
            } else if (windowSize <= 767) {
                document.body.classList.remove("vertical-sidebar-enable");

                if (this.layout != "horizontal") {
                    document.documentElement.setAttribute(
                        "data-sidebar-size",
                        "lg"
                    );
                }

                if (document.querySelector(".hamburger-icon")) {
                    document
                        .querySelector(".hamburger-icon")
                        .classList.add("open");
                }
            }
        },

        toggleHamburgerMenu() {
            var windowSize = document.documentElement.clientWidth;
            if (this.layout === "vertical") {
                if (windowSize <= 1025 && windowSize > 767) {
                    document.body.classList.add("vertical-sidebar-enable");
                    document.documentElement.setAttribute(
                        "data-sidebar-size",
                        "lg"
                    );
                } else if (windowSize > 1025) {
                    document.body.classList.remove("vertical-sidebar-enable");
                    document.documentElement.getAttribute(
                        "data-sidebar-size"
                    ) == "lg"
                        ? document.documentElement.setAttribute(
                              "data-sidebar-size",
                              "sm-hover"
                          )
                        : document.documentElement.setAttribute(
                              "data-sidebar-size",
                              "lg"
                          );
                } else if (windowSize <= 767) {
                    document.body.classList.add("vertical-sidebar-enable");
                    document.documentElement.setAttribute(
                        "data-sidebar-size",
                        "lg"
                    );
                }
                document
                    .querySelector(".hamburger-icon")
                    .classList.toggle("open");
            } else {
                if (windowSize > 767)
                    document
                        .querySelector(".hamburger-icon")
                        .classList.toggle("open");

                //For collapse horizontal menu
                document.body.classList.contains("menu")
                    ? document.body.classList.remove("menu")
                    : document.body.classList.add("menu");
            }

            //For collapse horizontal menu
            document.body.classList.contains("menu")
                ? document.body.classList.remove("menu")
                : document.body.classList.add("menu");
        },

        changeLayoutMode(mode) {
            if (mode == "dark") {
                this.changeMode({ mode: mode });
                this.changeTopbar({ topbar: mode });
                document.documentElement.classList.remove("mode-auto");
            } else if (mode == "brand") {
                this.changeMode({ mode: mode });
                this.changeTopbar({ topbar: mode });
                document.documentElement.classList.remove("mode-auto");
            } else if (mode == "auto") {
                this.changeMode({ mode: "light" });
                this.changeTopbar({ topbar: "dark" });
                document.documentElement.classList.add("mode-auto");
            } else {
                this.changeMode({ mode: "light" });
                this.changeTopbar({ topbar: "dark" });
                document.documentElement.classList.remove("mode-auto");
            }
        },

        markAsRead() {
            document.querySelectorAll(".notification-item").forEach((item) => {
                if (item.classList.contains("unread-message")) {
                    item.classList.remove("unread-message");
                }
            });
        },

        allClear() {
            document
                .querySelector(".empty-notification-elem")
                .classList.remove("d-none");

            document.querySelectorAll(".notification-item").forEach((item) => {
                item.remove();
            });
            document.querySelectorAll(".notification-badge").forEach((item) => {
                item.innerHTML = 0;
            });
        },
    },
    components: { simplebar },
    created() {
        this.newMemus = this.$store.state.layout.layoutMenuData;
    },
    watch: {
        layout: {
            immediate: true,
            deep: true,
            handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.newMemus = this.$store.state.layout.layoutMenuData;
                }
            },
        },
        layoutMenuData: {
            immediate: true,
            deep: true,
            handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.newMemus = this.$store.state.layout.layoutMenuData;
                }
            },
        },
    },
};
</script>

<template>
    <div class="menu-wrapper">
        <header id="page-topbar">
            <div class="layout-width">
                <div class="navbar-header" id="navbar-header">
                    <div class="d-flex" id="header-logo">
                        <!-- LOGO -->
                        <div class="navbar-brand-box horizontal-logo">
                            <router-link to="/" class="logo logo-dark">
                                <span class="logo-sm">
                                    <img
                                        src="@/assets/images/logo-sm.png"
                                        alt=""
                                        height="22"
                                    />
                                </span>
                                <span class="logo-lg">
                                    <img
                                        src="@/assets/images/logo-dark.png"
                                        alt=""
                                        height="22"
                                    />
                                </span>
                            </router-link>

                            <router-link to="/" class="logo logo-light">
                                <span class="logo-sm">
                                    <img
                                        src="@/assets/images/logo-sm.png"
                                        alt=""
                                        height="22"
                                    />
                                </span>
                                <span class="logo-lg">
                                    <img
                                        src="@/assets/images/logo-light.png"
                                        alt=""
                                        height="22"
                                    />
                                </span>
                            </router-link>
                        </div>

                        <BButton
                            variant="link"
                            size="sm"
                            class="px-3 header-item vertical-menu-btn topnav-hamburger shadow-none"
                            id="topnav-hamburger-icon"
                        >
                            <span class="hamburger-icon">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </BButton>
                    </div>
                    <!-- ========== App Menu ========== -->
                    <div class="app-menu navbar-menu mx-auto">
                        <!-- LOGO -->
                        <div class="navbar-brand-box vertical-logo">
                            <router-link to="/" class="logo logo-dark">
                                <span class="logo-sm">
                                    <img
                                        src="@/assets/images/logo-sm.png"
                                        alt=""
                                        height="22"
                                    />
                                </span>
                                <span class="logo-lg">
                                    <img
                                        src="@/assets/images/logo-dark.png"
                                        alt=""
                                        height="22"
                                    />
                                </span>
                            </router-link>

                            <router-link to="/" class="logo logo-light">
                                <span class="logo-sm">
                                    <img
                                        src="@/assets/images/logo-sm.png"
                                        alt=""
                                        height="22"
                                    />
                                </span>
                                <span class="logo-lg">
                                    <img
                                        src="@/assets/images/logo-light.png"
                                        alt=""
                                        height="22"
                                    />
                                </span>
                            </router-link>
                        </div>
                        <component
                            :is="layout === 'horizontal' ? 'div' : 'simplebar'"
                            id="scrollbar"
                        >
                            <ul class="navbar-nav" id="navbar-nav">
                                <template
                                    v-for="(item, index) in newMemus"
                                    :key="index"
                                >
                                    <!-- for without sub-items -->
                                    <li
                                        class="nav-item"
                                        v-if="!item.isHeader && !item.subItems"
                                    >
                                        <router-link
                                            :to="item.link"
                                            class="nav-link menu-link"
                                        >
                                            <i :class="item.icon"></i>
                                            <span :data-key="item.label">{{
                                                $t(item.label)
                                            }}</span>
                                        </router-link>
                                    </li>

                                    <!-- for subitems -->
                                    <li
                                        class="nav-item"
                                        v-if="!item.isHeader && item.subItems"
                                    >
                                        <BLink
                                            class="nav-link menu-link collapsed"
                                            :href="'#' + item.link"
                                            v-b-toggle="`'${item.link}'`"
                                            data-bs-toggle="collapse"
                                            role="button"
                                            aria-expanded="false"
                                            :aria-controls="item.link"
                                        >
                                            <i
                                                :class="item.icon"
                                                v-if="item.icon"
                                            ></i>
                                            <span :data-key="item.label">{{
                                                $t(item.label)
                                            }}</span>
                                        </BLink>
                                        <BCollapse
                                            class="menu-dropdown"
                                            :id="item.link"
                                            v-if="item.subItems"
                                            :class="
                                                item.id === 'bootstrapui'
                                                    ? 'menu-dropdown mega-dropdown-menu'
                                                    : ''
                                            "
                                        >
                                            <BRow
                                                v-if="item.id === 'bootstrapui'"
                                            >
                                                <BCol
                                                    lg="4"
                                                    v-for="(
                                                        bootItem, index
                                                    ) in item.subItems"
                                                    :key="index"
                                                >
                                                    <ul
                                                        class="nav nav-sm flex-column"
                                                    >
                                                        <li class="nav-item">
                                                            <router-link
                                                                :to="
                                                                    bootItem.link
                                                                "
                                                                class="nav-link"
                                                                :data-key="
                                                                    bootItem.label
                                                                "
                                                            >
                                                                {{
                                                                    $t(
                                                                        bootItem.label
                                                                    )
                                                                }}
                                                            </router-link>
                                                        </li>
                                                    </ul>
                                                </BCol>
                                            </BRow>

                                            <ul
                                                class="nav nav-sm flex-column"
                                                v-if="item.id !== 'bootstrapui'"
                                            >
                                                <li
                                                    class="nav-item 121"
                                                    v-for="(
                                                        subItem, index
                                                    ) in item.subItems"
                                                    :key="index"
                                                >
                                                    <!-- {{ subItem }} -->
                                                    <!-- for without subitems -->
                                                    <router-link
                                                        class="nav-link"
                                                        :to="subItem.link"
                                                        v-if="
                                                            !subItem.subItems &&
                                                            !subItem.isHeader
                                                        "
                                                    >
                                                        <i
                                                            v-if="subItem.icon"
                                                            :class="
                                                                subItem.icon
                                                            "
                                                        ></i>
                                                        <span
                                                            :data-key="
                                                                subItem.label
                                                            "
                                                            >{{
                                                                $t(
                                                                    subItem.label
                                                                )
                                                            }}</span
                                                        >
                                                    </router-link>

                                                    <!-- for with subitems -->
                                                    <BLink
                                                        class="nav-link menu-link collapsed"
                                                        :href="
                                                            '#' + subItem.link
                                                        "
                                                        v-b-toggle="
                                                            `'${subItem.link}'`
                                                        "
                                                        data-bs-toggle="collapse"
                                                        role="button"
                                                        aria-expanded="false"
                                                        :aria-controls="
                                                            subItem.link
                                                        "
                                                        v-if="subItem.subItems"
                                                    >
                                                        <i
                                                            :class="
                                                                subItem.icon
                                                            "
                                                            v-if="subItem.icon"
                                                        ></i>
                                                        <span
                                                            :data-key="
                                                                subItem.label
                                                            "
                                                            >{{
                                                                $t(
                                                                    subItem.label
                                                                )
                                                            }}</span
                                                        >
                                                    </BLink>
                                                    <BCollapse
                                                        class="menu-dropdown"
                                                        :id="subItem.link"
                                                        v-if="subItem.subItems"
                                                    >
                                                        <!-- for other all ui -->
                                                        <ul
                                                            class="nav nav-sm flex-column"
                                                        >
                                                            <li
                                                                class="nav-item"
                                                                v-for="(
                                                                    childItem,
                                                                    index
                                                                ) in subItem.subItems"
                                                                :key="index"
                                                            >
                                                                <!-- for whitout child items -->
                                                                <router-link
                                                                    class="nav-link"
                                                                    :to="
                                                                        childItem.link
                                                                    "
                                                                    v-if="
                                                                        !childItem.childItems
                                                                    "
                                                                >
                                                                    <span>{{
                                                                        $t(
                                                                            childItem.label
                                                                        )
                                                                    }}</span>
                                                                </router-link>

                                                                <!-- for with childitems -->
                                                                <BLink
                                                                    :href="
                                                                        '#' +
                                                                        childItem.link
                                                                    "
                                                                    v-b-toggle="
                                                                        `'${childItem.link}'`
                                                                    "
                                                                    class="nav-link collapsed"
                                                                    data-bs-toggle="collapse"
                                                                    role="button"
                                                                    aria-expanded="false"
                                                                    :aria-controls="
                                                                        childItem.link
                                                                    "
                                                                    :data-key="
                                                                        childItem.label
                                                                    "
                                                                    v-if="
                                                                        childItem.childItems
                                                                    "
                                                                >
                                                                    {{
                                                                        $t(
                                                                            childItem.label
                                                                        )
                                                                    }}</BLink
                                                                >
                                                                <BCollapse
                                                                    class="menu-dropdown"
                                                                    :id="
                                                                        childItem.link
                                                                    "
                                                                    v-if="
                                                                        childItem.childItems
                                                                    "
                                                                >
                                                                    <ul
                                                                        class="nav nav-sm flex-column"
                                                                    >
                                                                        <li
                                                                            class="nav-item"
                                                                            v-for="(
                                                                                subItem,
                                                                                index
                                                                            ) in childItem.childItems"
                                                                            :key="
                                                                                index
                                                                            "
                                                                        >
                                                                            <!-- for without subitems -->
                                                                            <router-link
                                                                                class="nav-link"
                                                                                :to="
                                                                                    subItem.link
                                                                                "
                                                                                v-if="
                                                                                    !subItem.childItems
                                                                                "
                                                                            >
                                                                                <span
                                                                                    >{{
                                                                                        $t(
                                                                                            subItem.label
                                                                                        )
                                                                                    }}</span
                                                                                >
                                                                            </router-link>

                                                                            <!-- for with subitems -->
                                                                            <BLink
                                                                                :href="
                                                                                    '#' +
                                                                                    subItem.link
                                                                                "
                                                                                v-b-toggle="
                                                                                    `'${subItem.link}'`
                                                                                "
                                                                                class="nav-link collapsed"
                                                                                data-bs-toggle="collapse"
                                                                                role="button"
                                                                                aria-expanded="false"
                                                                                :aria-controls="
                                                                                    subItem.link
                                                                                "
                                                                                :data-key="
                                                                                    subItem.label
                                                                                "
                                                                                v-if="
                                                                                    subItem.childItems
                                                                                "
                                                                                >{{
                                                                                    $t(
                                                                                        subItem.label
                                                                                    )
                                                                                }}</BLink
                                                                            >
                                                                            <BCollapse
                                                                                class="menu-dropdown"
                                                                                :id="
                                                                                    subItem.link
                                                                                "
                                                                                v-if="
                                                                                    subItem.childItems
                                                                                "
                                                                            >
                                                                                <ul
                                                                                    class="nav nav-sm flex-column"
                                                                                >
                                                                                    <li
                                                                                        class="nav-item"
                                                                                        v-for="(
                                                                                            lastMenu,
                                                                                            index
                                                                                        ) in subItem.childItems"
                                                                                        :key="
                                                                                            index
                                                                                        "
                                                                                    >
                                                                                        <!-- for last menu  -->
                                                                                        <router-link
                                                                                            :to="
                                                                                                lastMenu.link
                                                                                            "
                                                                                            class="nav-link"
                                                                                            >{{
                                                                                                $t(
                                                                                                    lastMenu.label
                                                                                                )
                                                                                            }}</router-link
                                                                                        >
                                                                                    </li>
                                                                                </ul>
                                                                            </BCollapse>
                                                                        </li>
                                                                    </ul>
                                                                </BCollapse>
                                                            </li>
                                                        </ul>
                                                    </BCollapse>
                                                </li>
                                            </ul>
                                        </BCollapse>
                                    </li>
                                </template>
                            </ul>
                        </component>
                    </div>

                    <div class="d-flex align-items-center" id="header-items">
                        <BDropdown
                            variant="link"
                            class="ms-1 topbar-head-dropdown header-item"
                            dropstart
                            :offset="{
                                alignmentAxis: 60,
                                crossAxis: 0,
                                mainAxis: -50,
                            }"
                            toggle-class="btn-icon btn-topbar rounded-circle arrow-none"
                            menu-class="dropdown-menu-end"
                        >
                            <template #button-content>
                                <img
                                    id="header-lang-img"
                                    src="@/assets/images/flags/us.svg"
                                    alt="Header Language"
                                    height="20"
                                    class="rounded"
                                />
                            </template>
                            <BLink
                                href="javascript:void(0);"
                                class="dropdown-item notify-item language py-2"
                                v-for="(entry, key) in languages"
                                :data-lang="entry.language"
                                :title="entry.title"
                                @click="
                                    setLanguage(
                                        entry.language,
                                        entry.title,
                                        entry.flag
                                    )
                                "
                                :key="key"
                            >
                                <img
                                    :src="entry.flag"
                                    alt="user-image"
                                    class="me-2 rounded"
                                    height="18"
                                />
                                <span class="align-middle">{{
                                    entry.title
                                }}</span>
                            </BLink>
                        </BDropdown>

                        <BDropdown
                            variant="link"
                            class="ms-2 topbar-head-dropdown header-item"
                            dropstart
                            :offset="{
                                alignmentAxis: 60,
                                crossAxis: 0,
                                mainAxis: -50,
                            }"
                            toggle-class="btn-icon rounded-circle arrow-none"
                            menu-class="p-2 dropdown-menu-end"
                        >
                            <template #button-content>
                                <img
                                    class="rounded-circle img-fluid"
                                    src="@/assets/images/users/avatar.png"
                                    alt="Header Avatar"
                                />
                            </template>
                            <div class="d-flex gap-2 mb-3 topbar-profile">
                                <div class="position-relative">
                                    <img
                                        class="rounded-1"
                                        src="@/assets/images/users/avatar.png"
                                        alt="Header Avatar"
                                    />
                                    <span
                                        class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger"
                                        ><span class="visually-hidden"
                                            >unread messages</span
                                        ></span
                                    >
                                </div>
                                <div>
                                    <h6 class="mb-1 fs-sm user-name">
                                        Damon Cote
                                    </h6>
                                    <p class="mb-0 fw-medium fs-xs">
                                        <BLink href="#!"
                                            >damoncote7@gmail.com</BLink
                                        >
                                    </p>
                                </div>
                            </div>

                            <BLink href="/logout" class="dropdown-item"
                                ><i
                                    class="bi bi-box-arrow-right align-middle me-2"
                                ></i>
                                Sign Out
                            </BLink>
                        </BDropdown>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>
