<template>
  <q-card style="width: 100%; max-width: 750px;">
    <q-toolbar>
      <q-toolbar-title>
        Portfolio
      </q-toolbar-title>
      <q-spacer></q-spacer>
      <q-btn round flat icon="close" @click="$emit('close')"></q-btn>
    </q-toolbar>

    <q-card v-for="item in portfolio" :key="item._id" class="q-my-md">
      <q-toolbar>
        <q-toolbar-title>
          {{ item.siteName }}
        </q-toolbar-title>
      </q-toolbar>
      <q-card-section>
        <a :href="item.url" target="_blank">
          <q-img :src="item.image"></q-img
        ></a>
      </q-card-section>
    </q-card>
  </q-card>
</template>

<script>
  import { useStore } from "stores/store";
  import { mapState } from "pinia";

  export default {
    name: "PortfolioDialog",
    computed: {
      ...mapState(useStore, ["portfolio"]),
    },
  };
</script>
