<template>
  <q-toolbar>
    <router-link to="/" v-if="Screen.gt.sm">
      <q-img src="/images/castoware-logo.jpeg" width="10vw"></q-img>
    </router-link>
    <q-toolbar-title class="text-h4">
      {{ title }}
    </q-toolbar-title>
  </q-toolbar>
</template>

<script setup>
import { Screen } from "quasar";

const props = defineProps(["buttons", "title"]);
</script>
