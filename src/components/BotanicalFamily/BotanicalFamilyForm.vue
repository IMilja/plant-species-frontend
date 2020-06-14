<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn color="green" dark class="mb-2" v-on="on">Unesi botaničku porodicu</v-btn>
    </template>
    <v-card :loading="loading">
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" :lazy-validation="true">
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="editingItem.croatianName"
                  label="Unesite hrvatski naziv botaničke porodice"
                  placeholder="npr. Usnače"
                  :error-messages="errors.croatianName"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="editingItem.latinName"
                  label="Unesite latinski naziv botaničke porodice"
                  placeholder="npr. Lamiaceae"
                  :error-messages="errors.latinName"
                ></v-text-field>
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
import { mapActions } from 'vuex';

export default {
  name: 'BotanicalFamilyForm',

  data() {
    return {
      dialog: false,
      loading: false,
      editingIndex: -1,
      editingItem: {
        croatianName: '',
        latinName: '',
      },
      defaultItem: {
        croatianName: '',
        latinName: '',
      },
      rules: {
        croatianName: [(v) => !!v || 'Hrvatski naziv je obavezan'],
      },
      errors: {},
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
      createBotancalFamily: 'botanicalFamily/create',
      editBotancalFamily: 'botanicalFamily/edit',
    }),

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editingIndex = -1;
        this.errors = {};
        this.loading = false;
        this.$refs.form.resetValidation();
        this.editingItem = { ...this.defaultItem };
      }, 300);
    },

    async save() {
      if (this.editingIndex === -1) {
        try {
          this.loading = true;
          await this.createBotancalFamily(this.editingItem);
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
          await this.editBotancalFamily(this.editingItem);
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

<style>

</style>
