<template>
  <div class="flex flex-center">
    <q-card style="min-width: 400px; max-width: 600px;">
      <q-card-section class="text-center">
        <img
          src="/storage/images/castoware-logo.jpeg"
          alt="Castoware Logo"
          style="max-width: 200px; height: auto; margin: 0 auto 20px"
        />

        <div v-if="loading" class="q-pa-lg">
          <q-spinner color="accent" size="3em" />
          <div class="text-h6 q-mt-md">Processing your payment...</div>
        </div>

        <div v-else-if="status === 'success'" class="q-pa-lg">
          <q-icon name="check_circle" color="positive" size="4em" />
          <div class="text-h5 q-mt-md">Payment Successful!</div>
          <div class="text-body1 q-mt-md">Thank you for your payment.</div>
          <div v-if="paymentData" class="q-mt-md text-left">
            <div>
              <strong>Invoice:</strong> {{ paymentData.invoice_number }}
            </div>
            <div>
              <strong>Amount:</strong> ${{ paymentData.amount }}
              {{ paymentData.currency }}
            </div>
            <div>
              <strong>Date:</strong> {{ formatDate(paymentData.paid_at) }}
            </div>
          </div>
        </div>

        <div v-else class="q-pa-lg">
          <q-icon name="error" color="negative" size="4em" />
          <div class="text-h5 q-mt-md">Payment Failed</div>
          <div class="text-body1 q-mt-md">
            {{ errorMessage || "There was a problem processing your payment." }}
          </div>
          <q-btn
            color="accent"
            label="Try Again"
            class="q-mt-md"
            @click="retry"
          />
        </div>
      </q-card-section>

      <q-separator v-if="status === 'success'" />

      <q-card-actions v-if="status === 'success'" align="center">
        <q-btn flat color="accent" label="Return Home" :to="{ name: 'home' }" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Notify } from "quasar";
import callApi from "src/assets/call-api";

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const status = ref(null);
const errorMessage = ref(null);
const paymentData = ref(null);

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
};

const retry = () => {
  // Redirect to cancelled page or home
  router.push({ name: "payment-cancelled" });
};

onMounted(async () => {
  // Extract query parameters
  const token = route.query.token;
  const payerId = route.query.PayerID;

  // Validate required parameters
  if (!token || !payerId) {
    status.value = "error";
    errorMessage.value = "Missing payment information. Please try again.";
    loading.value = false;
    return;
  }

  try {
    // Call capture API
    const response = await callApi({
      path: "/payment/capture",
      method: "get",
      payload: {
        token: token,
        PayerID: payerId,
      },
    });

    if (response.status === "success") {
      status.value = "success";
      paymentData.value = response.data;
    } else {
      status.value = "error";
      errorMessage.value =
        response.message || "Payment could not be completed.";

      // If redirect URL provided, redirect to cancellation page
      if (response.redirect) {
        setTimeout(() => {
          router.push(response.redirect);
        }, 3000);
      }
    }
  } catch (error) {
    console.error("Payment capture error:", error);
    status.value = "error";
    errorMessage.value =
      "An unexpected error occurred. Please contact support.";

    Notify.create({
      type: "negative",
      message: "Payment processing failed",
      position: "center",
    });
  } finally {
    loading.value = false;
  }
});
</script>
