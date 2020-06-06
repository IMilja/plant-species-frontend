<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn color="green" dark class="mb-2" v-on="on">Unesi novi rod</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-form
          ref="form"
          :lazy-validation="true"
        >
          <v-container><v-row>
              <v-col>
                <v-alert v-for="(error, index) in errors" :key="index" type="error">
                  <span v-for="(message, key) in error" :key="key">
                    {{ message }}
                  </span>
                </v-alert>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="editingItem.name"
                  label="Naziv roda"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  :items="botanicalFamilies"
                  v-model="editingItem.botanicalFamilyId"
                  label="Botanička porodica"
                  item-text="croatianName"
                  item-value="id"
                >
                  <template v-slot:no-data>
                    <span class="px-3 py-2">Nema podataka</span>
                  </template>
                </v-select>
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
// TODO: Handle Erros
import { mapState, mapActions } from 'vuex';

export default {
  name: 'SubspeciesForm',

  data() {
    return {
      dialog: false,
      editingIndex: -1,
      editingItem: {
        name: '',
        botanicalFamilyId: null,
      },
      defaultItem: {
        name: '',
        botanicalFamilyId: null,
      },
      rules: {
        name: [(v) => !!v || 'Polje naziv je obavezno'],
        botanicalFamilyId: [(v) => !!v || 'Odaberite botaničku porodicu'],
      },
      errors: [],
    };
  },

  computed: {
    ...mapState({
      botanicalFamilies: (state) => state.botanicalFamily.botanicalFamilies,
    }),

    formTitle() {
      return this.editingIndex === -1 ? 'Novi unos' : 'Ažuriranje';
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
    this.loadBotanicalFamilies();
  },

  methods: {
    ...mapActions({
      createGenus: 'genus/create',
      editGenus: 'genus/edit',
      loadBotanicalFamilies: 'botanicalFamily/loadAll',
    }),

    close() {
      this.dialog = false;
      this.errors = [];
      this.$refs.form.resetValidation();
      setTimeout(() => {
        this.editingIndex = -1;
        this.editingItem = { ...this.defaultItem };
      }, 300);
    },

    async save() {
      if (this.editingIndex === -1) {
        try {
          await this.createGenus(this.editingItem);
          this.close();
        } catch (error) {
          this.errors = error.response.data.data;
        }
      } else {
        try {
          await this.editGenus(this.editingItem);
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

<style>

</style>
