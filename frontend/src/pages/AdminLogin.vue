<template>
  <div class="flex flex-center" style="height: 100vh;">
    <q-form @submit.prevent="onSubmit">
      <q-card style="width: 40vw;">
        <q-toolbar>
          <q-toolbar-title>
            Sign In
          </q-toolbar-title>
          <q-btn icon="home" :to="{ name: 'home' }" color="accent"></q-btn>
        </q-toolbar>
        <q-separator></q-separator>
        <q-card-section>
          <q-input
            type="email"
            label="Email"
            v-model="form.email"
            dense
            outlined
            :rules="[(v) => !!v || 'Required']"
          ></q-input>
          <q-input
            :type="showPass ? 'text' : 'password'"
            label="Password"
            dense
            outlined
            v-model="form.password"
            :rules="[(v) => !!v || 'Required']"
            class="q-mt-sm"
          >
            <template #append>
              <q-btn
                round
                flat
                :icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
                @click="showPass = !showPass"
              ></q-btn>
            </template>
          </q-input>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions class="justify-end">
          <q-btn label="Submit" type="submit" color="accent"></q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script setup>
import { Loading, Notify } from "quasar";
import callApi from "src/assets/call-api";
import { useStore } from "src/stores/store";
import { ref } from "vue";

const store = useStore();

const form = ref({
  email: null,
  password: null,
});

const showPass = ref(false);

const onSubmit = async () => {
  Loading.show({ delay: 300 });

  const response = await callApi({
    path: "/login",
    method: "post",
    payload: form.value,
  });

  Loading.hide();

  if (response.status != "success") {
    Notify.create({
      type: "negative",
      message: response.message,
    });

    return;
  }

  store.token = response.token;

  store.router.push({ name: "admin-contacts" });
};
</script>
