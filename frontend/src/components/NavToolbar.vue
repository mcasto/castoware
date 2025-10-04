<template>
  <q-toolbar>
    <router-link to="/">
      <q-img src="/images/castoware-logo.jpeg" width="10vw"></q-img>
    </router-link>
    <q-toolbar-title class="text-h4">
      {{ title }}
    </q-toolbar-title>
    <q-btn label="Home" to="/" color="secondary"></q-btn>
    <q-btn
      label="About"
      :to="{ name: 'about' }"
      color="secondary"
      class="q-ml-md"
      v-if="buttons.about"
    ></q-btn>
    <q-btn
      label="Portfolio"
      :to="{ name: 'portfolio' }"
      color="secondary"
      class="q-ml-md"
      v-if="buttons.portfolio"
    ></q-btn>
  </q-toolbar>
</template>

<script setup>
const props = defineProps(["buttons", "title"]);
</script>
