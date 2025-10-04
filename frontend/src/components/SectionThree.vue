<template>
  <div
    id="three"
    class="flex column flex-center q-mt-md"
    style="width: 100%; height: 100%;"
  >
    <div>
      <div class="text-h3">
        Get in touch
      </div>
    </div>

    <q-form
      ref="contactForm"
      @submit="onSubmit"
      @reset="onReset"
      style="max-width: 750px;"
    >
      <div class="q-mt-md row q-pa-sm">
        <q-input
          type="text"
          label="Name"
          outlined
          class="col-5"
          v-model="name"
          :rules="[(v) => !!v || 'Name Required']"
        ></q-input>
        <q-input
          type="email"
          label="E-Mail"
          outlined
          class="col-6 offset-1"
          v-model="email"
          :rules="[
            (v) => !!v || 'E-Mail Required',
            (v) =>
              /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\..*$/.test(v) ||
              'Invalid E-Mail',
          ]"
        ></q-input>

        <div class="text-caption text-right" style="width: 100%;">
          Note: We will never use your email for any purpose other than
          contacting you regarding a project.
        </div>

        <q-input
          type="textarea"
          outlined
          class="col-12 q-mt-md"
          label="Message"
          v-model="message"
          :rules="[(v) => !!v || 'Message Required']"
        ></q-input>
        <div class="col-12 q-mt-md text-center">
          <q-btn outline rounded class="q-px-xl q-py-md" type="reset">
            Clear
          </q-btn>
          <q-btn outline rounded class="q-px-xl q-py-md q-ml-md" type="submit">
            Submit
          </q-btn>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
  import { useStore } from "stores/store";
  import { mapActions } from "pinia";

  export default {
    name: "SectionThree",
    data: () => ({
      name: null,
      email: null,
      message: null,
    }),
    methods: {
      ...mapActions(useStore, ["sendContact"]),
      onReset() {
        this.name = null;
        this.email = null;
        this.message = null;
      },
      onSubmit() {
        const form = this.$refs.contactForm;
        form.validate().then(() => {
          this.sendContact({
            name: this.name,
            email: this.email,
            message: this.message,
          }).then(() => {
            form.reset();
          });
        });
      },
    },
  };
</script>
