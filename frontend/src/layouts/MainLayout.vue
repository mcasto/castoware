<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-toolbar class="justify-end shadow-1">
        <q-toolbar-title v-if="Screen.gt.sm">
          {{ name }}
        </q-toolbar-title>
        <q-btn
          label="Home"
          color="secondary"
          class="q-mr-md"
          :to="{ name: 'home' }"
          :size="Screen.gt.sm ? 'md' : 'sm'"
        ></q-btn>
        <q-btn
          label="Portfolio"
          color="secondary"
          class="q-mr-md"
          :to="{ name: 'portfolio' }"
          :size="Screen.gt.sm ? 'md' : 'sm'"
        ></q-btn>
        <q-btn
          label="About Us"
          color="secondary"
          :to="{ name: 'about' }"
          :size="Screen.gt.sm ? 'md' : 'sm'"
        ></q-btn>
        <q-btn
          icon="mdi-cog"
          flat
          color="secondary"
          :to="{ name: 'admin-contacts' }"
        ></q-btn>
      </q-toolbar>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { startCase } from "lodash-es";
import { Screen } from "quasar";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const name = computed(() => {
  return startCase(route.name);
});
</script>
