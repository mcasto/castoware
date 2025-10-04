<template>
  <div class="row" id="one">
    <div class="column col-12 col-md-6 justify-center q-pt-sm">
      <q-img
        src="/images/castoware-logo.jpeg"
        fit="contain"
        width="80%"
        class="q-ml-lg"
      ></q-img>

      <div class="text-h5 q-pa-lg">
        <p>
          CastoWare was founded in 1998 as a freelance software development
          operation and has specialized in web and web application development
          ever since. We also provide desktop application development for
          Windows, Linux, and macOS.
        </p>

        <p>
          Headquartered in Cuenca, Ecuador, we operate primarily on a remote
          model to keep projects cost-effective and efficient. We collaborate
          with clients through video calls and, when it adds value, through
          in-person meetings.
        </p>

        <p class="text-right">
          <q-btn
            @click="$emit('scroll-to', 'two')"
            outline
            rounded
            class="q-px-xl q-py-md"
            >More</q-btn
          >
        </p>
      </div>
    </div>
    <div class="col-0 col-md-6">
      <q-img
        src="/images/web-design.jpg"
        fit="cover"
        style="height: 100%; width: 100%;"
      ></q-img>
    </div>
  </div>
</template>

<script setup>
//
</script>
