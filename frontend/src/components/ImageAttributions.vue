<template>
  <q-card style="width: 100%; max-width: 750px;">
    <q-toolbar>
      <q-toolbar-title>
        Image Attributions
      </q-toolbar-title>
      <q-spacer></q-spacer>
      <q-btn round flat icon="close" @click="$emit('close')"></q-btn>
    </q-toolbar>

    <q-card
      v-for="item in attributions"
      :key="item._id"
      class="q-my-md"
      bordered
    >
      <q-card-section class="row">
        <div class="col-6">
          <q-img :src="item.image" height="100px" fit="contain"></q-img>
        </div>
        <div class="flex flex-center col-6" v-html="item.credit"></div>
      </q-card-section>
    </q-card>
  </q-card>
</template>

<script>
import { uid } from "quasar";

export default {
  name: "ImageAttributions",
  data: () => ({
    attributions: [
      {
        _id: uid(),
        name: "Web Design",
        credit: `Image by&nbsp;<a href="https://pixabay.com/users/kreatikar-8562930/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3411373">Mudassar Iqbal</a>&nbsp;from&nbsp;<a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=3411373">Pixabay</a>`,
        image: "/images/web-design.jpg",
      },
      {
        _id: uid(),
        name: "Office",
        credit: `Image by&nbsp;<a href="https://pixabay.com/users/startupstockphotos-690514/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=594132">StartupStockPhotos</a>&nbsp;from&nbsp;<a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=594132">Pixabay</a>`,
        image: "/images/office.jpg",
      },
    ],
  }),
};
</script>
