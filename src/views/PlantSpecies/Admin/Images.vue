<template>
  <v-container>
    <v-row>
      <v-col>
        <upload-form></upload-form>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row v-if="!loading">
      <v-col cols="12" md="10" v-if="!images.length">
        <div class="mt-5">
          <v-divider></v-divider>
          <p class="body-2 text-center text--disabled my-3">
            Biljna vrsta nema dodijeljenih slika
          </p>
          <v-divider></v-divider>
        </div>
      </v-col>
      <v-col cols="12" md="10" v-else>
        <image-gallery
          :images="images"
        ></image-gallery>
      </v-col>
    </v-row>
    <v-row
      v-if="loading"
      class="fill-height ma-0"
      align="center"
      justify="center"
    >
      <v-progress-circular indeterminate color="green" size="100"></v-progress-circular>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

const UploadForm = () => import('@/components/general/UploadForm.vue');
const ImageGallery = () => import('@/components/general/ImageGallery.vue');

export default {
  name: 'AdminPlantSpeciesImages',

  components: {
    UploadForm,
    ImageGallery,
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState({
      images: (state) => state.image.images,
    }),
  },

  async created() {
    this.loading = true;
    await this.loadImages(this.$route.params.id);
    this.loading = false;
  },

  methods: {
    ...mapActions({
      loadImages: 'image/loadPlantSpeciesImages',
    }),
  },
};
</script>
