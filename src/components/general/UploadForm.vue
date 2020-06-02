<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="green" dark v-on="on">Učitaj novu sliku</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Učitavanje nove slike</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" :lazy-validation="true">
          <v-container>
            <v-row>
              <v-col>
                <v-alert v-for="(error, index) in errors" :key="index" type="error">
                  <span v-for="(message, key) in error" :key="key">
                    {{ message }}
                  </span>
                </v-alert>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Naziv slike"
                  v-model="editingItem.name"
                  :rules="rules.name"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Poveznica za sliku"
                  v-model="editingItem.imageUrl"
                  :disabled="!!editingItem.image"
                  :rules="rules.image"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-file-input
                  label="Slika"
                  v-model="editingItem.image"
                  :disabled="!!editingItem.imageUrl"
                  placeholder="Prenesite sliku sa računala"
                  accept="image/*"
                  :rules="rules.image"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Izvor"
                  v-model="editingItem.source"
                  :rules="rules.source"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="editingItem.uploadDate"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      label="Datum prijenosa"
                      v-model="editingItem.uploadDate"
                      :rules="rules.uploadDate"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="editingItem.uploadDate" no-title scrollable locale="hr">
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="closeMenu">Otkaži</v-btn>
                    <v-btn text color="primary"
                      @click="$refs.menu.save(editingItem.uploadDate)"
                    >
                      Uredu
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-textarea v-model="editingItem.description" label="Opis"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="close">Prekid</v-btn>
        <v-btn color="blue darken-1" text @click="save">Spremi</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// TODO: Create better Validation on form submit
import { mapActions } from 'vuex';

export default {
  name: 'UploadForm',

  props: {
    uploadFormType: {
      type: String,
      default: 'plantSpecies',
    },
  },

  data() {
    return {
      dialog: false,
      menu: false,
      loading: false,
      errors: [],
      editingItem: {
        name: '',
        description: '',
        source: '',
        uploadDate: '',
        imageUrl: '',
        image: null,
      },
      defaultItem: {
        name: '',
        description: '',
        source: '',
        uploadDate: '',
        imageUrl: '',
        image: null,
      },
      rules: {
        name: [(v) => !!v || 'Polje naziv je obavezno'],
        source: [(v) => !!v || 'Polje izvor je obavezno'],
        uploadDate: [(v) => !!v || 'Polje datum prijenosa je obavezno'],
        image: [(v) => !!v || 'Obavezno je odabrati sliku'],
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

  methods: {
    ...mapActions({
      uploadPlantSpeciesImage: 'image/addPlantSpeciesImage',
    }),

    close() {
      this.$refs.form.resetValidation();
      this.dialog = false;
      this.errors = [];
      setTimeout(() => {
        this.editingItem = { ...this.defaultItem };
      }, 500);
    },

    closeMenu() {
      this.menu = false;
    },

    async save() {
      this.loading = true;
      this.errors = [];

      switch (this.uploadFormType) {
        case 'plantSpecies':
          try {
            const payload = {
              plantSpeciesId: this.$route.params.id,
              image: this.editingItem,
            };

            await this.uploadPlantSpeciesImage(payload);

            this.loading = false;
            this.close();
          } catch (error) {
            this.loading = false;
            this.errors = error.response.data.data;
          }
          break;
        case 'plantPart':
          break;
        default:
          break;
      }
    },
  },
};
</script>
