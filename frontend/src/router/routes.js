import callApi from "src/assets/call-api";
import { useStore } from "src/stores/store";

const routes = [
  {
    path: "/login",
    component: () => import("pages/AdminLogin.vue"),
    name: "login",
  },

  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    beforeEnter: async (to, from, next) => {
      const store = useStore();

      let validUser = !!store.token;

      if (store.token) {
        const response = await callApi({
          path: "/validate-token",
          method: "get",
        });
        if (response.status == "success") {
          validUser = true;
        }
      }

      if (!validUser) {
        next("/login");
        return;
      }

      next();
    },
    children: [
      {
        path: "contacts",
        component: () => import("pages/AdminContacts.vue"),
        name: "admin-contacts",
        beforeEnter: async () => {
          const store = useStore();
          store.admin.contacts = await callApi({
            path: "/contacts",
            method: "get",
            useAuth: true,
          });
        },
      },
      {
        path: "portfolio",
        component: () => import("pages/AdminPortfolio.vue"),
        name: "admin-portfolio",
      },
    ],
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        name: "home",
      },
      {
        path: "portfolio",
        component: () => import("pages/PortfolioPage.vue"),
        beforeEnter: async () => {
          const store = useStore();
          store.portfolio = await callApi({
            path: "/portfolio",
            method: "get",
          });
        },
        name: "portfolio",
      },
      {
        path: "about-us",
        component: () => import("pages/AboutPage.vue"),
        name: "about",
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
