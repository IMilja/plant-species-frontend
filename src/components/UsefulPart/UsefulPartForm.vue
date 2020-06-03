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
        <v-container>
          <v-col v-if="editingIndex === -1">
            <v-select
              :items="availableUsefulParts"
              v-model="editingItem.usefulPartId"
              label="Uporabni dio"
              item-text="croatianName"
              item-value="id"
            >
              <template v-slot:no-data>
                <span class="px-3 py-2">Nema podataka</span>
              </template>
            </v-select>
          </v-col>
          <v-col>
            <v-textarea
              v-model="editingItem.description"
              label="Opis uporabnog dijela"
            ></v-textarea>
          </v-col>
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
import { mapState, mapActions, mapGetters } from 'vuex';

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
    };
  },

  computed: {
    ...mapState({
      allUsefulParts: (state) => state.usefulPart.allUsefulParts,
    }),

    ...mapGetters({
      availableUsefulParts: 'usefulPart/availableUsefulParts',
    }),

    formTitle() {
      return this.editingIndex === -1 ? 'Dodijeli novi' : 'Ažuriranje opisa';
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
      loadAllUsefulParts: 'usefulPart/loadAllUsefulParts',
      addUsefulPart: 'usefulPart/create',
      editUsefulPart: 'usefulPart/edit',
    }),

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editingIndex = -1;
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
        }
      } else {
        try {
          await this.editUsefulPart(this.editingItem);
          this.close();
        } catch (error) {
          console.log(error);
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
