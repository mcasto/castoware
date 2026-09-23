<template>
  <div class="flex flex-center" style="height: 100vh;">
    <q-form @submit.prevent="onSubmit">
      <q-card style="width: 60vw;">
        <q-toolbar>
          <q-toolbar-title>
            Edit Portfolio
          </q-toolbar-title>
          <q-btn
            round
            flat
            icon="close"
            :to="{ name: 'admin-portfolio' }"
          ></q-btn>
        </q-toolbar>
        <q-separator></q-separator>
        <q-card-section>
          <div class="row q-gutter-x-md">
            <div class="col">
              <q-input
                type="text"
                label="Site Name"
                v-model="form.site_name"
                dense
                outlined
                :rules="[(v) => !!v || 'Required']"
              ></q-input>

              <q-input
                type="text"
                label="URL"
                v-model="form.url"
                dense
                outlined
                :rules="[(v) => !!v || 'Required']"
              >
                <template #after>
                  <q-btn icon="link" @click="testLink" color="accent"></q-btn>
                </template>
              </q-input>
            </div>

            <div class="col">
              <div v-if="!form.replaceImage">
                <q-img :src="item?.image"></q-img>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-actions class="justify-end">
          <q-btn
            color="accent"
            label="Save"
            type="submit"
            :loading="loading"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-form>
  </div>
</template>

<script setup>
import { Notify, uid } from "quasar";
import callApi from "src/assets/call-api";
import { useStore } from "src/stores/store";
import { computed, onUpdated, ref } from "vue";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

const item = computed(() => {
  const portfolio = store.admin.portfolio.data || store.admin.portfolio;

  return portfolio.find(({ id }) => id == route.params.id);
});

const form = ref({
  id: item.value?.id || uid(),
  site_name: item.value?.site_name || null,
  url: item.value?.url || null,
  replaceImage: !item.value?.image,
  imageUploaded: false,
  filename: null,
});

const loading = ref(null);

const testLink = () => {
  window.open(form.value.url);
};

const onSubmit = async () => {
  loading.value = true;
  const payload = form.value;
  const path =
    route.params.id == "new" ? "/portfolio" : `/portfolio/${payload.id}`;
  const method = route.params.id == "new" ? "post" : "put";

  let response;
  try {
    response = await callApi({
      path,
      method,
      payload,
      useAuth: true,
      timeout: 60000,
    });
  } catch (error) {
    response = {
      status: "error",
      message:
        error.name == "TimeoutError"
          ? "The request timed out. The screenshot service may be slow or down — please try again later."
          : `Something went wrong saving the portfolio item${error.status ? ` (HTTP ${error.status})` : ""}.`,
    };
  }

  if (response.status != "success") {
    Notify.create({
      type: "negative",
      message: response.message,
      position: "center",
    });

    loading.value = false;

    return;
  }

  store.admin.portfolio = await callApi({ path: "/portfolio", method: "get" });

  Notify.create({
    type: response.warning ? "warning" : "positive",
    message: response.warning || "Portfolio Updated",
    position: "center",
  });

  loading.value = false;

  store.router.push({ name: "admin-portfolio" });
};

const onUpload = ({ xhr }) => {
  const response = JSON.parse(xhr.response);
  if (response.status != "success") {
    Notify.create({
      type: "negative",
      message: "There was a problem uploading the image.",
      position: "center",
    });

    return;
  }

  form.value.filename = response.filename;
  form.value.imageUploaded = true;
};
</script>
