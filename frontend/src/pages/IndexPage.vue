<template>
  <q-page class="flex">
    <div id="section-one" v-html="store.home.one"></div>
    <div id="section-two" v-html="store.home.two"></div>
    <section-three @scroll-to="scrollTo" id="section-three"></section-three>
  </q-page>
</template>

<script setup>
import { scroll } from "quasar";
import { useStore } from "stores/store";
import SectionThree from "components/SectionThree.vue";

const { getScrollTarget, setVerticalScrollPosition } = scroll;
const store = useStore();

const scrollTo = (section) => {
  const el = document.getElementById(section);
  const target = getScrollTarget(el);
  const offset = el.offsetTop;
  const duration = 1000;
  setVerticalScrollPosition(target, offset, duration);
};
</script>
