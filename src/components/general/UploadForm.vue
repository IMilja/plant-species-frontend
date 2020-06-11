<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="green" dark v-on="on">Učitaj novu sliku</v-btn>
    </template>
    <v-card :loading="loading">
      <v-card-title>
        <span class="headline">Učitavanje nove slike</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" :lazy-validation="true">
          <v-container>
            <v-row>
              <v-col cols="12" :class="{ 'col-md-6': isUsefulPartForm }">
                <v-text-field
                  label="Unesite naziv slike"
                  placeholder="npr. Slika borovice"
                  v-model="editingItem.name"
                  :rules="rules.name"
                  :error-messages="errors.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" v-if="isUsefulPartForm">
                <v-select
                  :items="usefulParts"
                  v-model="usefulPartId"
                  label="Odaberite uporabni dio"
                  placeholder="Uporabio dio"
                  item-text="croatianName"
                  item-value="id"
                  :error-messages="errors.usefulPartId"
                >
                  <template v-slot:no-data>
                    <span class="px-3 py-2">Nema podataka</span>
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Unesite link na sliku"
                  placeholder="https://www.veleri.hr/logo.png"
                  v-model="editingItem.imageUrl"
                  :disabled="!!editingItem.image"
                  :rules="rules.image"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-file-input
                  label="Odaberite sliku na računalu"
                  placeholder="Prenesite sliku sa računala"
                  v-model="editingItem.image"
                  :disabled="!!editingItem.imageUrl"
                  accept="image/*"
                  :rules="rules.image"
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Unesite izvor slike"
                  placeholder="npr. wikipedia.com"
                  v-model="editingItem.source"
                  :rules="rules.source"
                  :error-messages="errors.source"
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
                      label="Unesite datum u formatu (GGGG-MM-DD)"
                      placeholder="npr. 2020-12-10"
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
                <v-textarea
                  label="Unesite opis slike"
                  placeholder="Slike prikazuje izgled borovice"
                  v-model="editingItem.description"
                ></v-textarea>
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
import { mapState, mapActions } from 'vuex';

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
      usefulPartId: null,
      rules: {
        name: [(v) => !!v || 'Polje naziv je obavezno'],
        source: [(v) => !!v || 'Polje izvor je obavezno'],
        uploadDate: [(v) => !!v || 'Polje datum prijenosa je obavezno'],
        image: [(v) => !!v || 'Obavezno je odabrati sliku'],
      },
      errors: {},
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
    ...mapState({
      usefulParts: (state) => state.plantSpecies.usefulParts,
    }),
    isUsefulPartForm() {
      return this.uploadFormType === 'usefulPart';
    },
  },

  created() {
    if (this.isUsefulPartForm && !this.usefulParts.length) {
      this.loadUsefulParts(this.$route.params.id);
    }
  },

  methods: {
    ...mapActions({
      uploadPlantSpeciesImage: 'image/addPlantSpeciesImage',
      uploadUsefulPartImage: 'image/addUsefulPartImage',
      loadUsefulParts: 'plantSpecies/loadUsefulParts',
    }),

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editingItem = { ...this.defaultItem };
        this.errors = [];
        this.$refs.form.resetValidation();
        this.usefulPartId = null;
      }, 300);
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
            this.errors = error.response.data.errors.reduce((map, object) => {
              const value = map;
              value[object.param] = object.msg;
              return value;
            }, {});
          }
          break;
        case 'usefulPart':
          try {
            const payload = {
              plantSpeciesId: this.$route.params.id,
              usefulPartId: this.usefulPartId,
              image: this.editingItem,
            };

            await this.uploadUsefulPartImage(payload);

            this.loading = false;
            this.close();
          } catch (error) {
            this.loading = false;
            this.errors = error.response.data.errors.reduce((map, object) => {
              const value = map;
              value[object.param] = object.msg;
              return value;
            }, {});
          }
          break;
        default:
          break;
      }
    },
  },
};
</script>
