<template>
  <v-dialog v-model="dialog" max-width="400px">
    <template v-slot:activator="{ on }">
      <v-btn x-small color="green" text dark class="pa-0" v-on="on">
        <v-icon>mdi-plus</v-icon><span class="d-none d-sm-inline">Dodaj novu</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Unos bioaktivne tvari</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" :lazy-validation="true">
          <v-container>
            <v-row v-if="errors.length">
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
                  v-model.trim="editingItem.name"
                  label="Unesite naziv bioaktivne tvari"
                  placeholder="Bioaktivna tvar"
                  :rules="rules.name"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="10" sm="8">
                <v-select
                  v-model="editingItem.measureUnitId"
                  :items="measureUnits"
                  placeholder="Mjerna jedinica"
                  label="Odaberite mjernu jedinicu"
                  item-text="name"
                  item-value="id"
                  :rules="rules.measureUnitId"
                >
                  <template v-slot:no-data>
                    <span class="px-3 py-2">Nema podataka</span>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="2" sm="4" class="d-flex align-center">
                <measure-unit-form></measure-unit-form>
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
import { mapState, mapActions } from 'vuex';
import MeasureUnitForm from '@/components/MeasureUnit/MeasureUnitForm.vue';

export default {
  name: 'BioactiveSubstanceForm',

  components: {
    MeasureUnitForm,
  },

  data() {
    return {
      dialog: false,
      editingItem: {
        name: '',
        measureUnitId: null,
      },
      defaultItem: {
        name: '',
        measureUnitId: null,
      },
      errors: [],
      rules: {
        name: [(v) => !!v || 'Naziv je obavezan'],
        measureUnitId: [(v) => !!v || 'Mjerna jedinica je obavezna'],
      },
    };
  },

  computed: {
    ...mapState({
      measureUnits: (state) => state.measureUnit.measureUnits,
    }),
  },

  created() {
    if (!this.measureUnits.length) {
      this.loadMeasureUnits();
    }
  },

  methods: {
    ...mapActions({
      loadMeasureUnits: 'measureUnit/loadAll',
      createBioactiveSubstance: 'bioactiveSubstance/create',
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
        await this.createBioactiveSubstance(this.editingItem);
        this.close();
      } catch (error) {
        this.errors = error.response.data.data;
      }
    },
  },
};
</script>

<style>
</style>
