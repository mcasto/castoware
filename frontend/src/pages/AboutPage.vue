<template>
  <div class="bg-grey-1">
    <div v-html="store.aboutUs"></div>
  </div>
</template>

<script setup>
import { useStore } from "src/stores/store";

const store = useStore();
</script>

<style>
.about-container {
  min-height: 100vh;
  background-color: white;
  padding: 48px 16px;
}

.about-max-width {
  max-width: 896px;
  margin: 0 auto;
}

.header-divider {
  width: 96px;
  height: 4px;
  margin: 0 auto 24px;
}

.accent-divider {
  width: 64px;
  height: 4px;
}

.team-member-image {
  height: 300px;
  object-fit: contain;
  margin-top: 8px;
}

.together-image {
  height: 200px;
  object-fit: contain;
  margin-top: 8px;
}

.goal-box {
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 32px;
  border-left: 4px solid;
}

@media (min-width: 1024px) {
  .about-container {
    padding: 48px 32px;
  }
}

@media (min-width: 640px) {
  .about-container {
    padding: 48px 24px;
  }
}
</style>
