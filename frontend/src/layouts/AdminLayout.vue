<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="justify-between">
        <q-toolbar-title shrink>
          Admin
        </q-toolbar-title>

        <q-tabs>
          <q-route-tab :to="{ name: 'admin-contacts' }">
            Contacts
          </q-route-tab>
          <q-route-tab :to="{ name: 'admin-portfolio' }">
            Portfolio
          </q-route-tab>
        </q-tabs>

        <div>
          <q-btn icon="home" round flat :to="{ name: 'home' }"></q-btn>
          <q-btn icon="logout" round flat @click="logout"></q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useStore } from "src/stores/store";

const store = useStore();

const logout = () => {
  store.token = null;
  store.router.push({ name: "login" });
};
</script>
