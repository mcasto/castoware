import { defineStore } from "pinia";
import { ref } from "vue";
import callApi from "src/assets/call-api";

export const useStore = defineStore(
  "store",
  () => {
    const state = {
      admin: ref({
        contacts: null,
        portfolio: null,
      }),
      aboutUs: ref(null),
      home: ref(null),
      portfolio: ref(null),
      token: ref(null),
    };
    const getters = {};

    // Public page data is persisted, so pages render the last-known content
    // immediately while these refresh it in the background
    const load = async (
      path,
      onSuccess,
      isValid = (response) => response.status == "success"
    ) => {
      try {
        const response = await callApi({ path, method: "get" });
        if (isValid(response)) {
          onSuccess(response);
        } else {
          console.error({ error: response });
        }
      } catch (error) {
        console.error({ error });
      }
    };

    const actions = {
      loadHome: () =>
        load(
          "/home",
          (response) => {
            state.home.value = response;
          },
          (response) => response.one !== undefined
        ),
      loadPortfolio: () =>
        load("/portfolio", (response) => {
          state.portfolio.value = response.data;
        }),
      loadAboutUs: () =>
        load("/about-us", (response) => {
          state.aboutUs.value = response.html;
        }),
    };

    return { ...state, ...getters, ...actions };
  },
  {
    persist: {
      key: "castoware",
    },
  }
);
