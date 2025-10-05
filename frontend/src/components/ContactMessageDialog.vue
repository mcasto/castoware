<template>
  <q-dialog v-model="model">
    <q-card>
      <q-card-section>
        {{ message }}
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
const model = defineModel();
const props = defineProps(["message"]);
</script>
