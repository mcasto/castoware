import callApi from "src/assets/call-api";
import { useStore } from "src/stores/store";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
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
