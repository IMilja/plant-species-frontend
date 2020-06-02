<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <image-showcase ref="imageShowcase"></image-showcase>
        <upload-form></upload-form>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row v-if="!loading">
      <v-col
        v-for="image in images"
        :key="image.id"
        class="d-flex child-flex"
        cols="3"
      >
        <v-card flat tile class="d-flex">
          <v-img
            :src="image.imageUrl"
            :lazy-src="image.imageUrl"
            aspect-ratio="1"
            class="grey lighten-2 cursor-p"
            @click="openImage(image)"
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-card>
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
// TODO: Handle Constant Image Loading
// Add pagination later
import { mapState, mapActions } from 'vuex';
import UploadForm from '@/components/general/UploadForm.vue';
import ImageShowcase from '@/components/general/ImageShowcase.vue';

export default {
  name: 'PlantSpeciesImages',

  components: {
    UploadForm,
    ImageShowcase,
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
      loadImages: 'image/plantSpeciesloadAll',
    }),

    openImage(image) {
      this.$refs.imageShowcase.open(image);
    },
  },
};
</script>

<style>
.cursor-p {
  cursor: pointer;
}
</style>
