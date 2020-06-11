<template>
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-icon large color="red" @click="close">mdi-close</v-icon>
      </v-card-title>
      <v-card-text>
        <v-container fluid>
          <v-row>
            <v-col class="col-12 order-0 col-lg-8">
              <v-img
                class="mx-auto"
                aspect-ratio="1"
                :src="image.imageUrl"
                max-height="700"
                contain
              ></v-img>
            </v-col>
            <v-col class="col-12 order-1 col-lg-4">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title class="title">{{ image.name }}</v-list-item-title>
                  <p class="body-1 mt-5" v-if="image.croatianName">
                    Slika uporabnog dijela: {{image.croatianName}} / {{ image.latinName }}
                  </p>
                  <p class="body-1 my-5">{{ descriptionSummary }}</p>
                  <a
                    @click="showSummary()"
                    v-if="image.description.length > 200"
                    class="mb-5"
                  >{{ summary ? 'Pročitaj više' : 'Pročitaj manje' }}</a>
                  <p class="body-2">
                    Izvor:
                    <br />
                    {{ image.source }} - {{ image.uploadDate | dayjs }}
                  </p>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'ImageShowcase',

  data() {
    return {
      dialog: false,
      summary: true,
      image: {
        name: '',
        description: '',
        source: '',
        uploadDate: '',
        imageUrl: '',
        croatianName: '',
        latinName: '',
      },
      defaultImage: {
        name: '',
        description: '',
        source: '',
        uploadDate: '',
        imageUrl: '',
        croatianName: '',
        latinName: '',
      },
    };
  },

  watch: {
    dialog(val) {
      if (!val) {
        this.close();
      }
    },
  },

  computed: {
    descriptionSummary() {
      if (this.summary && this.image.description.length > 300) {
        return `${this.image.description.substring(0, 300)}...`;
      }
      return this.image.description;
    },
  },

  filters: {
    dayjs(date) {
      if (!date) {
        return '';
      }
      return dayjs(date).format('DD.MM.YYYY');
    },
  },

  methods: {
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.image = { ...this.defaultImage };
      }, 300);
    },

    open(image) {
      this.image = { ...image };
      this.dialog = true;
    },

    showSummary() {
      this.summary = !this.summary;
    },
  },
};
</script>
