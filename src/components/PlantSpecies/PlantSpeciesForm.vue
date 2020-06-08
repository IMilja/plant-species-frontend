<template>
  <v-dialog v-model="dialog" max-width="700px">
    <template v-slot:activator="{ on }">
      <v-btn color="green" dark class="mb-2" v-on="on">Unos biljne vrste</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-alert v-for="(error, index) in errors" :key="index" type="error">
                <span v-for="(message, key) in error" :key="key">
                  {{ message }}
                </span>
              </v-alert>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="editingItem.croatianName"
                label="Hrvatski naziv"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="editingItem.latinName"
                label="Latinski naziv"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="editingItem.synonym"
                label="Sinonim"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-select
                :items="genera"
                v-model="editingItem.genusId"
                label="Rod"
                item-text="name"
                item-value="id"
              >
                <template v-slot:no-data>
                  <span class="px-3 py-2">Nema podataka</span>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :items="systematists"
                v-model="editingItem.systematistId"
                label="Sistematičar"
                item-text="name"
                item-value="id"
              >
                <template v-slot:no-data>
                  <span class="px-3 py-2">Nema podataka</span>
                </template>
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="editingItem.description"
                label="Opis biljne vrste"
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
      errors: [],
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
      this.errors = [];
      setTimeout(() => {
        this.editingIndex = -1;
        this.editingItem = { ...this.defaultItem };
      }, 500);
    },

    async save() {
      this.errors = [];
      if (this.editingIndex === -1) {
        try {
          await this.createPlantSpecies(this.editingItem);
          this.close();
        } catch (error) {
          this.errors = error.response.data.data;
        }
      } else {
        try {
          await this.editPlantSpecies(this.editingItem);
          this.close();
        } catch (error) {
          this.errors = error.response.data.data;
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
