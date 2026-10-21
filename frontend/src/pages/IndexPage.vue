<template>
  <q-page class="flex">
    <template v-if="store.home">
      <div id="section-one" v-html="store.home.one" @click="onLinkClick"></div>
      <div id="section-two" v-html="store.home.two" @click="onLinkClick"></div>
    </template>
    <div v-else class="flex flex-center full-width q-pa-xl">
      <q-spinner size="3em" color="secondary"></q-spinner>
    </div>
    <section-three @scroll-to="scrollTo" id="section-three"></section-three>
  </q-page>
</template>

<script setup>
import { scroll } from "quasar";
import { useRouter } from "vue-router";
import { useStore } from "stores/store";
import internalLinks from "src/assets/internal-links";
import SectionThree from "components/SectionThree.vue";

const { getScrollTarget, setVerticalScrollPosition } = scroll;
const store = useStore();
const onLinkClick = internalLinks(useRouter());

const scrollTo = (section) => {
  const el = document.getElementById(section);
  const target = getScrollTarget(el);
  const offset = el.offsetTop;
  const duration = 1000;
  setVerticalScrollPosition(target, offset, duration);
};
</script>
