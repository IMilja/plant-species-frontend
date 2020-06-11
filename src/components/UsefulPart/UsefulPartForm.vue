<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn color="green" dark class="mb-2" v-on="on">Dodijeli uporabni dio</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" :lazy-validation="true">
          <v-container>
            <v-row v-if="editingIndex === -1">
              <v-col>
                <v-select
                  :items="availableUsefulParts"
                  v-model="editingItem.usefulPartId"
                  label="Odaberite uporabni dio"
                  placeholder="Uporabni dio"
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
              <v-col>
                <v-textarea
                  v-model="editingItem.description"
                  label="Unesite opis uporabnog dijela"
                  placeholder="Opis uporabnog dijela"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
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
import { mapState, mapActions } from 'vuex';

export default {
  name: 'UsefulPartForm',

  data() {
    return {
      dialog: false,
      editingIndex: -1,
      editingItem: {
        usefulPartId: null,
        plantSpeciesId: this.$route.params.id,
        description: '',
      },
      defaultItem: {
        usefulPartId: null,
        plantSpeciesId: this.$route.params.id,
        description: '',
      },
      errors: {},
      rules: {
        usefulPart: [(v) => !!v || 'Uporabni dio je obavezan'],
      },
    };
  },

  computed: {
    ...mapState({
      allUsefulParts: (state) => state.usefulPart.usefulParts,
      takenUsefulParts: (state) => state.plantSpecies.usefulParts,
    }),

    formTitle() {
      return this.editingIndex === -1 ? 'Dodijeli novi' : 'Ažuriranje opisa';
    },

    availableUsefulParts() {
      return this.allUsefulParts.filter(
        (o1) => this.takenUsefulParts.filter((o2) => o2.id === o1.id).length === 0,
      );
    },
  },

  watch: {
    dialog(val) {
      if (!val) {
        this.close();
      }
    },
  },

  created() {
    if (!this.allUsefulParts.length) {
      this.loadAllUsefulParts();
    }
  },

  methods: {
    ...mapActions({
      loadAllUsefulParts: 'usefulPart/loadAll',
      addUsefulPart: 'plantSpecies/createUsefulPart',
      editUsefulPart: 'plantSpecies/editUsefulPart',
    }),

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editingIndex = -1;
        this.errors = {};
        this.editingItem = { ...this.defaultItem };
      }, 300);
    },

    async save() {
      if (this.editingIndex === -1) {
        try {
          await this.addUsefulPart(this.editingItem);
          this.close();
        } catch (error) {
          console.log(error);
          this.errors = error.response.data.errors.reduce((map, object) => {
            const value = map;
            value[object.param] = object.msg;
            return value;
          }, {});
        }
      } else {
        try {
          await this.editUsefulPart(this.editingItem);
          this.close();
        } catch (error) {
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

      const {
        id,
        description,
      } = editingItem;

      this.editingItem = {
        usefulPartId: id,
        description,
        plantSpeciesId: this.$route.params.id,
      };
    },
  },
};
</script>

<style>

</style>
