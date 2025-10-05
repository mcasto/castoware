<template>
  <div>
    <q-table :rows="store.admin.contacts" :columns="columns">
      <template #body-cell-email="props">
        <q-td>
          <a :href="`mailto:${props.value}`">{{ props.value }}</a>
        </q-td>
      </template>

      <template #body-cell-tools="{row}">
        <q-td class="text-right">
          <q-btn
            icon="delete"
            flat
            round
            @click="deleteContact(row.id)"
          ></q-btn>
          <q-btn
            icon="note"
            flat
            round
            @click="showDialog = { visible: true, message: row.message }"
          ></q-btn>
        </q-td>
      </template>
    </q-table>

    <contact-message-dialog
      v-model="showDialog.visible"
      :message="showDialog.message"
    ></contact-message-dialog>
  </div>
</template>

<script setup>
import { format, formatISO9075, parseISO } from "date-fns";
import { useStore } from "src/stores/store";
import ContactMessageDialog from "src/components/ContactMessageDialog.vue";
import { ref } from "vue";
import { Notify } from "quasar";
import callApi from "src/assets/call-api";
import { remove } from "lodash-es";

const store = useStore();

const showDialog = ref({ visible: false, message: null });

const columns = [
  { label: "Name", field: "name", name: "name", align: "left" },
  { label: "Email", name: "email", field: "email", align: "left" },
  { label: "Subject", name: "subject", field: "subject", align: "left" },
  {
    label: "Received",
    name: "created_at",
    field: (row) => {
      return format(parseISO(row.created_at), "PPpp");
    },
    align: "left",
  },
  { name: "tools" },
];

const deleteContact = async (id) => {
  Notify.create({
    type: "warning",
    message: "Are you sure you want to delete this contact?",
    actions: [
      {
        label: "No",
      },
      {
        label: "Yes",
        handler: async () => {
          const response = await callApi({
            path: `/contacts/${id}`,
            method: "delete",
            useAuth: true,
          });

          if (response.status != "success") {
            Notify.create({
              type: "negative",
              message: "There was a problem deleting the contact.",
            });

            return;
          }

          Notify.create({
            type: "positive",
            message: "Contact deleted.",
          });

          remove(store.admin.contacts, (contact) => contact.id == id);
        },
      },
    ],
  });
};
</script>
