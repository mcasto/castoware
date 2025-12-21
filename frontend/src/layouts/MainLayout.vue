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
      <q-footer class="bg-white text-black">
        <q-toolbar
          class="flex justify-center q-py-md"
          style="border-top: 1px solid lightgray;"
        >
          ©{{ new Date().getFullYear() }} CastoWare Development, LLC</q-toolbar
        >
      </q-footer>

      <q-dialog v-model="showAttributions">
        <image-attributions
          @close="showAttributions = false"
        ></image-attributions>
      </q-dialog>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { startCase } from "lodash-es";
import { Screen, uid } from "quasar";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import ImageAttributions from "src/components/ImageAttributions.vue";

const route = useRoute();

const showAttributions = ref(false);

const name = computed(() => {
  return startCase(route.name);
});
</script>
