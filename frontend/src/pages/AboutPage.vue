<template>
  <div class="bg-grey-1">
    <nav-toolbar :buttons="{ portfolio: true }" title="About"></nav-toolbar>

    <div class="row full-width q-pa-md q-gutter-y-lg">
      <!-- Mike's Card -->
      <q-card class="col-12" flat>
        <q-card-section class="q-pa-none">
          <div class="row items-center q-pa-md bg-primary text-white">
            <q-avatar size="80px" class="q-mr-md">
              <q-icon name="person" size="40px" />
            </q-avatar>
            <div>
              <div class="text-h4 text-weight-bold">Mike Casto</div>
              <div class="text-h6">Founder & Lead Developer</div>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-xl">
          <div class="row q-col-gutter-lg">
            <div class="col-12 col-md-6">
              <div class="text-h6 q-mb-md text-primary">
                Technical Expertise
              </div>
              <q-list bordered class="rounded-borders">
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="code" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-medium"
                      >Web Development</q-item-label
                    >
                    <q-item-label caption
                      >HTML since mid-90s, JavaScript & CSS since late
                      90s</q-item-label
                    >
                  </q-item-section>
                </q-item>

                <q-separator />

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="storage" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-medium"
                      >Current Stack</q-item-label
                    >
                    <q-item-label caption
                      >Laravel backend, VueJS + Quasar frontend</q-item-label
                    >
                  </q-item-section>
                </q-item>

                <q-separator />

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="database" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-medium"
                      >Databases</q-item-label
                    >
                    <q-item-label caption
                      >MySQL, SQLite, Firebase, NoSQL</q-item-label
                    >
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <div class="col-12 col-md-6">
              <div class="text-h6 q-mb-md text-primary">Career Timeline</div>
              <div class="q-pl-md">
                <div class="q-mb-lg">
                  <div class="text-weight-bold text-body1">1996</div>
                  <div class="text-caption">Developed first client website</div>
                </div>

                <div class="q-mb-lg">
                  <div class="text-weight-bold text-body1">1997</div>
                  <div class="text-caption">
                    Founded CastoWare Development • Visual Basic CGI app for LM
                    Berry Company
                  </div>
                </div>

                <div class="q-mb-lg">
                  <div class="text-weight-bold text-body1">1998-1999</div>
                  <div class="text-caption">
                    IT at Berry Company • Visual Basic + Genesys telephony
                  </div>
                </div>

                <div class="q-mb-lg">
                  <div class="text-weight-bold text-body1">1999+</div>
                  <div class="text-caption">
                    Freelance • ColdFusion → PHP • Modern JS frameworks
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Margaret's Card -->
      <q-card class="col-12" flat>
        <q-card-section class="q-pa-none">
          <div class="row items-center q-pa-md bg-teal text-white">
            <q-avatar size="80px" class="q-mr-md">
              <q-icon name="support_agent" size="40px" />
            </q-avatar>
            <div>
              <div class="text-h4 text-weight-bold">Margaret Westlake</div>
              <div class="text-h6">Support & Database Specialist</div>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-lg">
          <div class="row q-col-gutter-lg">
            <div class="col-12 col-md-8">
              <q-list bordered class="rounded-borders">
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="business_center" color="teal" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-medium"
                      >30+ Years Experience</q-item-label
                    >
                    <q-item-label caption
                      >Director overseeing programming teams at major US health
                      insurer</q-item-label
                    >
                  </q-item-section>
                </q-item>

                <q-separator />

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="model_training" color="teal" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-medium"
                      >SQL Expertise</q-item-label
                    >
                    <q-item-label caption
                      >Extensive knowledge of complex SQL and database
                      architecture</q-item-label
                    >
                  </q-item-section>
                </q-item>

                <q-separator />

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="palette" color="teal" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-weight-medium"
                      >Design Eye</q-item-label
                    >
                    <q-item-label caption
                      >Background in printing and magazine layout with strong
                      sense of color and design</q-item-label
                    >
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import NavToolbar from "src/components/NavToolbar.vue";
</script>
