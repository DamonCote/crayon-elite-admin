import horMenu from "../components/menu";
import { ref } from "vue";
import { layoutMethods, layoutComputed } from "@/state/helpers";

export default {
    data() {
        return {
            newMenuItems: [],
            splitMenuItems: [],
            menuItems: horMenu,
            navbarMenuItems: [],
        };
    },
    computed: {
        ...layoutComputed,
        layout: {
            get() {
                return this.$store ? this.$store.state.layout.layout : {} || {};
            },
        },
    },
    created() {
        this.changeMenudata({ layoutMenuData: horMenu });
    },
    methods: {
        ...layoutMethods,

        setupHorizontalMenu(langChange = null) {
            setTimeout(() => {
                const isMoreMenu = ref(false);
                const navbarNav = document.getElementById("navbar-header");
                const navbarMenu = document.querySelector(".navbar-menu");
                navbarMenu.classList.add("opacity-0");

                // count width of horizontal menu
                const headerLogo =
                    document.getElementById("header-logo")?.clientWidth || 0;
                const headerItems =
                    document.getElementById("header-items")?.clientWidth || 0;
                const fullWidthOfMenu =
                    navbarNav.clientWidth - headerLogo - headerItems - 150;
                const menuData = horMenu;

                langChange = typeof langChange === "object" ? null : langChange;
                // Create the "More" menu item and add the hidden items to its subItems
                const menuItems = document.querySelectorAll(
                    "ul.navbar-nav > li.nav-item"
                );
                if (this.navbarMenuItems.length === 0 || langChange === "2") {
                    langChange = null;
                    const menuArray = [];
                    Array.prototype.forEach.call(menuItems, function (item) {
                        menuArray.push(item.offsetWidth);
                    });
                    this.navbarMenuItems = menuArray;
                }
                const navbarNavWidth = this.navbarMenuItems;
                let totalItemsWidth = 0;
                let visibleItems = [];
                let hiddenItems = [];

                const moreMenuItem = {
                    id: "more",
                    label: "t-more",
                    icon: "ri-briefcase-2-line",
                    subItems: null,
                    link: "sidebarMore",
                    stateVariables: isMoreMenu.value,
                    click: (e) => {
                        e.preventDefault();
                        isMoreMenu.value = !isMoreMenu.value;
                    },
                };

                var This = this;
                Array.prototype.forEach.call(
                    menuData,
                    function (item, index) {
                        const itemWidth = navbarNavWidth[index];
                        totalItemsWidth += itemWidth;
                        if (
                            totalItemsWidth > fullWidthOfMenu &&
                            fullWidthOfMenu != 0 &&
                            langChange === null &&
                            This.layout &&
                            This.layout !== "vertical"
                        ) {
                            hiddenItems.push(item);
                        } else {
                            visibleItems.push(item);
                        }
                        if (index + 1 === menuData.length) {
                            moreMenuItem.subItems = hiddenItems;
                        }
                    },
                    This
                );

                const updatedMenuItems =
                    hiddenItems.length > 0
                        ? [...visibleItems, moreMenuItem]
                        : visibleItems;
                this.menuItems = updatedMenuItems;

                this.changeMenudata({ layoutMenuData: updatedMenuItems });

                localStorage.removeItem("menuItems");
                localStorage.setItem(
                    "menuItems",
                    JSON.stringify(updatedMenuItems)
                );

                navbarMenu.classList.remove("opacity-0");
                document
                    .getElementById("header-items")
                    .classList.remove("opacity-0");
            }, 10);
        },
    },
};
