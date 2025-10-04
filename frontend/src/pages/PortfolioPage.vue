<template>
  <div>
    <nav-toolbar :buttons="{ about: true }" title="Portfolio"></nav-toolbar>
    <div class="row">
      <div
        class="col-12 col-md-6"
        v-for="site of store.portfolio"
        :key="`portfolio-${site.id}`"
      >
        <div class="q-pa-sm">
          <q-card dark>
            <q-toolbar flat>
              <q-toolbar-title>
                {{ site.site_name }}
              </q-toolbar-title>
              <q-btn icon="link" round flat @click="openLink(site.url)"></q-btn>
            </q-toolbar>
            <q-card-section>
              <q-img :src="site.image" fit="contain" height="30vh"></q-img>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "src/stores/store";
import NavToolbar from "src/components/NavToolbar.vue";

const store = useStore();

const openLink = (url) => {
  window.open(url);
};
</script>
