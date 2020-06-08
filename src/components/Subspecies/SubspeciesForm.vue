<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn color="green" dark class="mb-2" v-on="on">Unos podvrste</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-col>
            <v-text-field
              v-model="editingItem.name"
              label="Naziv"
            ></v-text-field>
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
// TODO: Handle Erros
import { mapActions } from 'vuex';

export default {
  name: 'SubspeciesForm',

  data() {
    return {
      dialog: false,
      editingIndex: -1,
      editingItem: {
        name: '',
        plantSpeciesId: this.$route.params.id,
      },
      defaultItem: {
        name: '',
        plantSpeciesId: this.$route.params.id,
      },
    };
  },

  computed: {
    formTitle() {
      return this.editingIndex === -1 ? 'Unos' : 'Ažuriranje';
    },
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
      createSubspecies: 'subspecies/create',
      editSubspecies: 'subspecies/edit',
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
          await this.createSubspecies(this.editingItem);
          this.close();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.editSubspecies(this.editingItem);
          this.close();
        } catch (error) {
          console.log(error);
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

<style>

</style>
