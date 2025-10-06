<template>
  <div>
    <q-table grid :rows="pagedRows" :pagination="pagination" hide-bottom>
      <template #top>
        <div class="flex justify-between full-width">
          <q-pagination
            v-model="pagination.page"
            :max="pagination.max"
            direction-links
            color="accent"
          ></q-pagination>

          <q-btn
            round
            icon="add"
            color="accent"
            :to="{ name: 'edit-portfolio', params: { id: 'new' } }"
          ></q-btn>
        </div>
      </template>
      <template #item="{row}">
        <q-td>
          <q-card dark style="max-width: 30vw; height: 100%;">
            <q-card-actions class="justify-end">
              <q-btn
                round
                flat
                icon="delete"
                class="q-mr-md"
                @click="onDelete(row)"
              ></q-btn>
              <q-btn
                round
                flat
                icon="edit"
                :to="{ name: 'edit-portfolio', params: { id: row.id } }"
              ></q-btn>
            </q-card-actions>
            <q-separator dark></q-separator>
            <q-card-section>
              <div class="text-h6 ellipsis">
                {{ row.site_name }}
              </div>
            </q-card-section>
            <q-card-section>
              <q-img :src="row.image" width="27vw" fit="contain"></q-img>
            </q-card-section>
          </q-card>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { remove } from "lodash-es";
import { ceil } from "lodash-es";
import { Notify } from "quasar";
import callApi from "src/assets/call-api";
import { useStore } from "src/stores/store";
import { computed, ref } from "vue";

const store = useStore();

const pagination = ref({
  page: 1,
  rowsPerPage: 6,
  max: ceil(store.admin.portfolio.length / 6),
});

const pagedRows = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.rowsPerPage;
  const end = start + pagination.value.rowsPerPage;
  return store.admin.portfolio.slice(start, end);
});

const onDelete = async (item) => {
  Notify.create({
    type: "warning",
    message: `Are you sure you want to delete the entry for ${item.site_name}`,
    actions: [
      { label: "No" },
      {
        label: "Yes",
        handler: async () => {
          const response = await callApi({
            path: `/portfolio/${item.id}`,
            method: "delete",
            useAuth: true,
          });

          if (response.status != "success") {
            Notify.create({
              type: "negative",
              message: "Unable to delete portfolio entry",
              position: "center",
            });

            return;
          }

          remove(store.admin.portfolio, ({ id }) => id == item.id);
        },
      },
    ],
  });
};
</script>
