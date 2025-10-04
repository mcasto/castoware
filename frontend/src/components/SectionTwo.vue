<template>
  <div class="row" id="two" style="width: 100%;">
    <div class="col-0 col-md-6">
      <q-img
        src="/images/office.jpg"
        fit="cover"
        style="height: 100%; width: 100%;"
      ></q-img>
    </div>

    <div class="column col-12 col-md-6 justify-center q-pt-sm">
      <div class="text-h4 text-center">
        What We Offer
      </div>
      <div class="q-pa-lg text-body1">
        <ul>
          <li>
            Professional development at reasonable cost
          </li>
          <li>Web application development</li>
          <li>Web development</li>
          <li>Hosting options</li>
          <li>Desktop application development for Windows, Linux, Macintosh</li>
          <li>Flexible collaboration</li>
        </ul>
        <div class="q-ml-md">
          <q-icon name="mdi-bullhorn" size="lg" color="accent"></q-icon>
          Coming Soon!
          <div class="text-subtitle2"><em>Prism</em> by CastoWare</div>
          <div class="text-caption">
            Beginning development in Q4 2025, <em>Prism</em> will address
            long-standing gaps in US healthcare provider data with an innovative
            approach to accuracy and timeliness.
          </div>
        </div>
      </div>
      <div class="text-body1 text-center">
        View our
        <router-link :to="{ name: 'portfolio' }" class="text-accent"
          >portfolio</router-link
        >
        to see some of our recent work
      </div>
      <div class="text-body1 text-center q-mt-sm">
        <router-link :to="{ name: 'about' }" class="text-accent"
          >About</router-link
        >
        Our Team
      </div>
      <div class="text-body1 text-center q-mt-md">
        If you want to discuss a project
      </div>
      <div class="text-body1 text-center q-mt-md">
        <q-btn outline rounded @click="$emit('scroll-to', 'three')">
          Contact Us
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
//
</script>
