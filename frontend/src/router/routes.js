import { Loading } from "quasar";
import callApi from "src/assets/call-api";
import { useStore } from "src/stores/store";

const routes = [
  /**
   * Login
   */
  {
    path: "/login",
    component: () => import("pages/AdminLogin.vue"),
    name: "login",
  },

  /**
   * Admin routes
   */
  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    name: "admin",
    beforeEnter: async (to, from, next) => {
      const store = useStore();

      let validUser = !!store.token;

      if (store.token) {
        const response = await callApi({
          path: "/validate-token",
          method: "get",
          useAuth: true,
        });

        if (response.status == "success") {
          validUser = true;
        } else {
          next("/login");
          return;
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
        alias: "",
        component: () => import("pages/AdminContacts.vue"),
        name: "admin-contacts",
        beforeEnter: async () => {
          const store = useStore();
          const response = await callApi({
            path: "/contacts",
            method: "get",
            useAuth: true,
          });

          if (response.status == "success") {
            store.admin.contacts = response.data.contacts;
          } else {
            store.admin.contacts = [];
            console.error({ error: response });
          }
        },
      },
      {
        path: "portfolio",
        component: () => import("pages/AdminPortfolio.vue"),
        beforeEnter: async () => {
          const store = useStore();

          const response = await callApi({
            path: "/portfolio",
            method: "get",
          });

          if (response.status == "success") {
            store.admin.portfolio = response.data;
          } else {
            store.admin.portfolio = [];
            console.error({ error: response });
          }
        },
        name: "admin-portfolio",
      },
      {
        path: "edit-portfolio/:id",
        component: () => import("pages/EditPortfolio.vue"),
        beforeEnter: async () => {
          const store = useStore();

          const response = await callApi({
            path: "/portfolio",
            method: "get",
          });

          if (response.status == "success") {
            store.admin.portfolio = response.data;
          } else {
            store.admin.portfolio = [];
            console.error({ error: response });
          }
        },
        name: "edit-portfolio",
      },
    ],
  },

  /**
   * Payment routes
   */
  {
    path: "/payment/complete",
    component: () => import("pages/PaymentCompletePage.vue"),
    name: "payment-complete",
  },
  {
    path: "/payment/cancelled",
    component: () => import("pages/PaymentCancelledPage.vue"),
    name: "payment-cancelled",
  },

  /**
   * Public routes
   */
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        beforeEnter: async () => {
          const store = useStore();
          store.home = await callApi({ path: "/home", method: "get" });
        },
        name: "home",
      },
      {
        path: "portfolio",
        component: () => import("pages/PortfolioPage.vue"),
        beforeEnter: async () => {
          const store = useStore();

          Loading.show({ message: "Loading portfolio images", delay: 300 });

          const response = await callApi({
            path: "/portfolio",
            method: "get",
          });

          if (response.status == "success") {
            store.portfolio = response.data;
          } else {
            store.portfolio = [];
            console.error({ error: response });
          }

          Loading.hide();
        },
        name: "portfolio",
      },
      {
        path: "about-us",
        component: () => import("pages/AboutPage.vue"),
        beforeEnter: async () => {
          const store = useStore();
          const response = await callApi({ path: "/about-us", method: "get" });

          if (response.status == "success") {
            store.aboutUs = response.html;
          } else {
            store.portfolio = [];
            console.error({ error: response });
          }
        },
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
