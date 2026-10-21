<template>
  <div>
    <div v-if="!store.portfolio" class="flex flex-center q-pa-xl">
      <q-spinner size="3em" color="secondary"></q-spinner>
    </div>
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

const store = useStore();

const openLink = (url) => {
  window.open(url);
};
</script>
