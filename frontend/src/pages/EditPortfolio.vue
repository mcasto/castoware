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

              <div class="flex justify-end" v-if="item?.image">
                <q-btn
                  :label="
                    form.replaceImage ? 'Cancel Image Change' : 'Change Image'
                  "
                  color="accent"
                  @click="form.replaceImage = !form.replaceImage"
                ></q-btn>
              </div>
            </div>

            <div class="col">
              <q-uploader
                v-if="form.replaceImage"
                auto-upload
                field-name="uploadedFile"
                url="/api/handle-upload"
                :form-fields="[
                  { name: 'uploadType', value: 'portfolio' },
                  { name: 'id', value: form.id },
                ]"
                :headers="[
                  { name: 'Authorization', value: `Bearer ${store.token}` },
                ]"
                @uploaded="onUpload"
              ></q-uploader>

              <div v-if="!form.replaceImage">
                <q-img :src="item?.image"></q-img>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-separator></q-separator>

        <q-card-actions class="justify-end">
          <q-btn color="accent" label="Save" type="submit"></q-btn>
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
  return store.admin.portfolio.find(({ id }) => id == route.params.id);
});

const form = ref({
  id: item.value?.id || uid(),
  site_name: item.value?.site_name || null,
  url: item.value?.url || null,
  replaceImage: !item.value?.image,
  imageUploaded: false,
  filename: null,
});

const testLink = () => {
  window.open(form.value.url);
};

const onSubmit = async () => {
  if (form.value.replaceImage && !form.value.imageUploaded) {
    Notify.create({
      type: "negative",
      message: "Image selection required.",
      position: "center",
    });
    return;
  }
  const payload = form.value;
  const path =
    route.params.id == "new" ? "/portfolio" : `/portfolio/${payload.id}`;
  const method = route.params.id == "new" ? "post" : "put";

  const response = await callApi({ path, method, payload, useAuth: true });

  if (response.status != "success") {
    Notify.create({
      type: "negative",
      message: response.message,
      position: "center",
    });

    return;
  }

  store.admin.portfolio = await callApi({ path: "/portfolio", method: "get" });

  Notify.create({
    type: "positive",
    message: "Portfolio Updated",
    position: "center",
  });

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
