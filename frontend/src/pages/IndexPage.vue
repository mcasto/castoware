<template>
  <q-page class="flex">
    <section-one @scroll-to="scrollTo"></section-one>
    <section-two @scroll-to="scrollTo"></section-two>
    <section-three @scroll-to="scrollTo"></section-three>
  </q-page>
</template>

<script>
import { scroll } from "quasar";
const { getScrollTarget, setVerticalScrollPosition } = scroll;

import { useStore } from "stores/store";

const store = useStore();

import SectionOne from "components/SectionOne.vue";
import SectionTwo from "components/SectionTwo.vue";
import SectionThree from "components/SectionThree.vue";

export default {
  name: "IndexPage",
  components: { SectionOne, SectionTwo, SectionThree },
  methods: {
    scrollTo(section) {
      const el = document.getElementById(section);
      const target = getScrollTarget(el);
      const offset = el.offsetTop;
      const duration = 1000;
      setVerticalScrollPosition(target, offset, duration);
    },
  },
};
</script>
