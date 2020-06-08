<template>
  <v-dialog v-model="dialog" max-width="300px">
    <template v-slot:activator="{ on }">
      <v-btn x-small color="green" text dark class="pa-0" v-on="on">
        <v-icon>mdi-plus</v-icon><span class="d-none d-sm-inline">Dodaj novu</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Mjerna jedinica</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" :lazy-validation="true">
          <v-container>
            <v-row v-if="errors.length">
              <v-col cols="12">
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
                  v-model.trim="editingItem.name"
                  label="Unesite naziv mjerne jednice"
                  placeholder="Mjerna jednica"
                  :rules="rules.name"
                ></v-text-field>
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
// TODO: Loader on post request
import { mapActions } from 'vuex';

export default {
  name: 'MeasureUnitForm',

  data() {
    return {
      dialog: false,
      editingItem: {
        name: '',
      },
      defaultItem: {
        name: '',
      },
      rules: {
        name: [(v) => !!v || 'Polje naziv je obavezno'],
      },
      errors: [],
    };
  },

  methods: {
    ...mapActions({
      createMeasureUnit: 'measureUnit/create',
    }),

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editingItem = { ...this.defaultItem };
        this.errors = [];
        this.$refs.form.resetValidation();
      }, 300);
    },

    async save() {
      this.errors = [];
      try {
        await this.createMeasureUnit(this.editingItem);
        this.close();
      } catch (error) {
        this.errors = error.response.data.data;
      }
    },
  },
};
</script>
