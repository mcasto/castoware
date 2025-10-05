import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useStore = defineStore(
  "store",
  () => {
    const state = {
      admin: ref({
        contacts: null,
        portfolio: null,
      }),
      portfolio: ref(null),
      token: ref(null),
    };
    const getters = {};
    const actions = {};

    return { ...state, ...getters, ...actions };
  },
  {
    persist: {
      key: "default-key",
    },
  }
);
