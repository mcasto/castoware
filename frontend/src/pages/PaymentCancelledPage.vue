<template>
  <div class="flex flex-center">
    <q-card style="min-width: 400px; max-width: 600px">
      <q-card-section class="text-center q-pa-lg">
        <img
          src="/storage/images/castoware-logo.jpeg"
          alt="Castoware Logo"
          style="max-width: 200px; height: auto; margin: 0 auto 20px"
        />

        <q-icon name="cancel" color="warning" size="4em" />
        <div class="text-h5 q-mt-md">Payment Cancelled</div>
        <div class="text-body1 q-mt-md">
          Your payment was cancelled. No charges have been made to your account.
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="center">
        <q-btn flat color="accent" label="Return Home" :to="{ name: 'home' }" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import callApi from "src/assets/call-api";

const route = useRoute();

onMounted(async () => {
  // Notify backend of cancellation if token present
  const token = route.query.token;

  if (token) {
    try {
      await callApi({
        path: "/payment/cancel",
        method: "get",
        payload: { token },
      });
    } catch (error) {
      console.error("Error notifying cancellation:", error);
      // Fail silently - user already knows payment was cancelled
    }
  }
});
</script>
