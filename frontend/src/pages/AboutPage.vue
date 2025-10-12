<template>
  <div class="bg-grey-1">
    <div class="row full-width q-pa-md q-gutter-y-lg">
      <about-card
        v-for="(info, idx) of store.aboutUs"
        :key="`about-us-${idx}`"
        :info="info"
      ></about-card>
    </div>
  </div>
</template>

<script setup>
import AboutCard from "src/components/AboutCard.vue";
import { useStore } from "src/stores/store";

const store = useStore();

console.log({ aboutUs: store.aboutUs });
</script>
