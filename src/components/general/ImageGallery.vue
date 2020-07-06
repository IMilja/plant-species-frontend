<template>
  <v-container class="pa-0">
    <v-row>
      <v-col
        v-for="image in images"
        :key="image.id"
        class="d-flex child-flex"
        cols="6"
        sm="4"
        md="3"
      >
        <v-card class="elevation-2">
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
          <v-card-actions v-if="isAdmin">
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
    <v-divider></v-divider>
    <image-showcase ref="imageShowcase"></image-showcase>
    <confirm-dialog ref="confirm" v-if="isAdmin"></confirm-dialog>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

const ConfirmDialog = () => import('@/components/general/ConfirmDialog.vue');
const ImageShowcase = () => import('@/components/general/ImageShowcase.vue');

export default {
  name: 'ImageGallery',

  components: {
    ConfirmDialog,
    ImageShowcase,
  },

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    images: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    ...mapActions({
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
            text: `Uspješno izbrisana slika ${item.name}`,
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
