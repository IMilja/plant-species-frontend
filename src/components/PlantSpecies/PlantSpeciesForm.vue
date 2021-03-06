<template>
  <v-dialog v-model="dialog" max-width="550px">
    <template v-slot:activator="{ on }">
      <v-btn color="green" dark class="mb-2" v-on="on">Unos biljne vrste</v-btn>
    </template>
    <v-card :loading="loading">
      <template v-slot:progress>
        <v-progress-linear
          color="green"
          :indeterminate="true"
        ></v-progress-linear>
      </template>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="editingItem.croatianName"
                label="Unesite hrvatski ime bilje vrste"
                placeholder="npr. Borovica"
                :error-messages="errors.croatianName"
                color="green"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="editingItem.latinName"
                label="Unesite latinski ime bilje vrste"
                placeholder="npr. Juniperus communis"
                :error-messages="errors.latinName"
                color="green"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editingItem.synonym"
                label="Unesite sinonime"
                placeholder="Sinonim"
                color="green"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                :items="genera"
                v-model="editingItem.genusId"
                label="Odaberite rod kojoj biljna vrsta pripada"
                placeholder="Rod"
                item-text="name"
                item-value="id"
                :error-messages="errors.genusId"
                color="green"
                item-color="green"
              >
                <template v-slot:no-data>
                  <span class="px-3 py-2">Nema unosa</span>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :items="systematists"
                v-model="editingItem.systematistId"
                label="Odaberite sistematičara kojoj biljna vrsta pripada"
                placeholder="Sistematičar"
                item-text="name"
                item-value="id"
                color="green"
                item-color="green"
              >
                <template v-slot:no-data>
                  <span class="px-3 py-2">Nema unosa</span>
                </template>
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="editingItem.description"
                label="Unesite opis biljne vrste"
                placeholder="Ova biljna vrsta pripada"
                :error-messages="errors.description"
                color="green"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="close">Prekid</v-btn>
          <v-btn color="blue darken-1" text @click="save">Spremi</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
// TODO: Loader on post request
import { mapState, mapActions } from 'vuex';

export default {
  name: 'PlantSpeciesForm',

  data() {
    return {
      editingIndex: -1,
      loading: false,
      editingItem: {
        croatianName: '',
        latinName: '',
        synonym: '',
        description: '',
        systematistId: null,
        genusId: null,
      },
      defaultItem: {
        croatianName: '',
        latinName: '',
        synonym: '',
        description: '',
        systematistId: null,
        genusId: null,
      },
      errors: {},
      dialog: false,
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
      systematists: (state) => state.systematist.systematists,
      genera: (state) => state.genus.genera,
    }),

    formTitle() {
      return this.editingIndex === -1 ? 'Unos' : 'Ažuriranje';
    },
  },

  created() {
    if (!this.systematists.length) {
      this.loadSystematists();
    }
    if (!this.genera.length) {
      this.loadGenera();
    }
  },

  methods: {
    ...mapActions({
      createPlantSpecies: 'plantSpecies/create',
      editPlantSpecies: 'plantSpecies/edit',
      loadSystematists: 'systematist/loadAll',
      loadGenera: 'genus/loadAll',
    }),

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editingIndex = -1;
        this.errors = {};
        this.loading = false;
        this.editingItem = { ...this.defaultItem };
      }, 500);
    },

    async save() {
      if (this.editingIndex === -1) {
        try {
          this.loading = true;
          await this.createPlantSpecies(this.editingItem);
          this.close();
        } catch (error) {
          this.loading = false;
          this.errors = error.response.data.errors.reduce((map, object) => {
            const value = map;
            value[object.param] = object.msg;
            return value;
          }, {});
        }
      } else {
        try {
          this.loading = true;
          await this.editPlantSpecies(this.editingItem);
          this.close();
        } catch (error) {
          this.loading = false;
          this.errors = error.response.data.errors.reduce((map, object) => {
            const value = map;
            value[object.param] = object.msg;
            return value;
          }, {});
        }
      }
    },

    edit(editingIndex, editingItem) {
      this.dialog = true;
      this.editingIndex = editingIndex;
      this.editingItem = { ...editingItem };
    },
  },
};
</script>
