<template>
  <q-card class="col-12" flat>
    <q-card-section class="q-pa-none">
      <div
        class="row items-center q-pa-md text-white"
        :class="`bg-${info.theme}`"
      >
        <q-avatar size="80px" class="q-mr-md" v-if="Screen.gt.sm">
          <q-icon :name="info.icon" size="40px" />
        </q-avatar>
        <div>
          <div class="text-h4 text-weight-bold">{{ info.name }}</div>
          <div class="text-h6">{{ info.role }}</div>
        </div>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-xl">
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-6">
          <div class="text-h6 q-mb-md" :class="`text-${info.theme}`">
            {{ info.expertise.label }}
          </div>
          <q-list bordered class="rounded-borders" separator>
            <q-item
              v-for="(item, idx) of info.expertise.items"
              :key="`expertise-${idx}`"
            >
              <q-item-section avatar>
                <q-icon :name="item.icon" :color="info.theme" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-medium">{{
                  item.title
                }}</q-item-label>
                <q-item-label caption>{{ item.subtitle }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <div class="col-12 col-md-6" v-if="info.career">
          <div class="text-h6 q-mb-md" :class="`text-${info.theme}`">
            {{ info.career.label }}
          </div>

          <div class="q-pl-md">
            <template
              v-for="(item, idx) of info.career.items"
              :key="`career-${idx}`"
            >
              <div class="q-mb-lg">
                <div class="text-weight-bold text-body1">{{ item.year }}</div>
                <div class="text-caption">{{ item.caption }}</div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { Screen } from "quasar";

const props = defineProps(["info"]);
</script>
