<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="justify-between">
        <q-toolbar-title shrink v-if="Screen.gt.sm">
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
import { Notify, Screen } from "quasar";
import callApi from "src/assets/call-api";
import { useStore } from "src/stores/store";

const store = useStore();

const logout = async () => {
  const response = await callApi({
    path: "/logout",
    method: "get",
    useAuth: true,
  });

  if (response.status == "success") {
    store.token = null;
    store.router.push({ name: "login" });
    return;
  }

  Notify.create({
    type: "negative",
    position: "center",
    message: "Unable to logout.",
  });
};
</script>
