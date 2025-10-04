import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useStore = defineStore(
  "store",
  () => {
    // examples
    // const state = {
    //   cuePointer: ref(null),
    // };
    // const getters = {
    //   activeShow: computed(activeShow),
    // };
    // const actions = {
    //   addShow,
    // };

    const state = {};
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
