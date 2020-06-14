<template>
  <v-container>
    <v-row>
      <v-col>
        <image-showcase ref="imageShowcase"></image-showcase>
        <confirm-dialog ref="confirm"></confirm-dialog>
        <upload-form upload-form-type="usefulPart"></upload-form>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row v-if="!loading">
      <v-col v-if="!images.length">
        <p class="headline text-center mt-5">Nema dodijeljenih slika</p>
      </v-col>
      <v-col
        v-for="image in images"
        :key="image.id"
        class="d-flex child-flex"
        cols="6"
        sm="4"
      >
        <v-card tile>
          <v-img
            :src="image.imageUrl"
            :lazy-src="image.imageUrl"
            aspect-ratio="1"
            class="grey lighten-2 cursor-p relative"
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
          <v-card-actions>
            <v-btn
              class="mx-auto"
              color="red"
              small
              text
              @click="deleteItem(image)"
            >
              Izbriši sliku
            </v-btn>
          </v-card-actions>
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
import { mapState, mapActions } from 'vuex';
import ConfirmDialog from '@/components/general/ConfirmDialog.vue';
import UploadForm from '@/components/general/UploadForm.vue';
import ImageShowcase from '@/components/general/ImageShowcase.vue';

export default {
  name: 'UsefulPartImages',

  components: {
    UploadForm,
    ImageShowcase,
    ConfirmDialog,
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
      loadImages: 'image/loadUsefulPartImages',
      deleteImage: 'image/deleteImage',
      activeSnackbar: 'snackbar/activeSnackbar',
    }),

    openImage(image) {
      this.$refs.imageShowcase.open(image);
    },

    async deleteItem(item) {
      try {
        if (await this.$refs.confirm.open(
          'Brisanje slike',
          `Jeste li sigurni da želite izbrisati sliku "${item.name}"`,
        )) {
          await this.deleteImage(item);
          this.activeSnackbar({
            color: 'success',
            isActive: true,
            text: `Uspješno izbrisana uporabni dio ${item.name}`,
          });
        }
      } catch (error) {
        if (error.response.status === 409) {
          this.activeSnackbar({
            color: 'error',
            isActive: true,
            text: 'Došlo je do pogreške prilikom brisanja',
          });
        }
      }
    },
  },
};
</script>

<style>
.cursor-p {
  cursor: pointer;
}
</style>
