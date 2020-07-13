<template>
  <v-dialog v-model="dialog" max-width="550px">
    <template v-slot:activator="{ on }">
      <v-btn color="green" dark v-on="on">Dodjeli bioaktivu tvar</v-btn>
    </template>
    <v-card :loading="loading">
      <template v-slot:progress>
        <v-progress-linear
          color="green"
          :indeterminate="true"
        ></v-progress-linear>
      </template>
      <v-card-title>
        <span class="headline">Dodjela bioaktivne tvari</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" :lazy-validation="true">
          <v-container>
            <v-row>
              <v-col cols="10" sm="9">
                <v-select
                  v-model="editingItem.bioactiveSubstanceId"
                  :items="bioactiveSubstances"
                  placeholder="Bioaktivnu tvar"
                  label="Odaberite bioaktivnu tvar"
                  item-text="name"
                  item-value="id"
                  :rules="rules.bioactiveSubstance"
                  :error-messages="errors.bioactiveSubstanceId"
                  color="green"
                  item-color="green"
                >
                  <template v-slot:item="{ item, attrs, on }">
                    <v-list-item
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-list-item-content>
                        <v-list-item-title
                          :id="attrs['aria-labelledby']"
                          v-text="item.name"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                          class="overline mt-1"
                          v-text="item.measureUnit.name">
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                  <template v-slot:no-data>
                    <span class="px-3 py-2">Nema unosa</span>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="2" sm="3" class="d-flex align-center pt-0 pt-md-3">
                <bioactive-substance-form></bioactive-substance-form>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model.trim="editingItem.content"
                  label="Unesite količinu sadržaja bioaktivne tvari"
                  placeholder="Količina sadržaja"
                  :rules="rules.content"
                  :error-messages="errors.content"
                  color="green"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="editingItem.usefulPartId"
                  :items="usefulParts"
                  label="Odaberite uporabni dio"
                  placeholder="Uporabni dio"
                  item-text="croatianName"
                  item-value="id"
                  :rules="rules.usefulPart"
                  :error-messages="errors.usefulPartId"
                  color="green"
                  item-color="green"
                >
                  <template v-slot:item="{ item, attrs, on }">
                    <v-list-item
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-list-item-content>
                        <v-list-item-title
                          :id="attrs['aria-labelledby']"
                          v-text="item.croatianName"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                          class="overline mt-1"
                          v-text="item.latinName">
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </template>
                  <template v-slot:no-data>
                    <span class="px-3 py-2">Nema unosa</span>
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
import { mapState, mapActions } from 'vuex';

const BioactiveSubstanceForm = () => import('@/components/BioactiveSubstance/BioactiveSubstanceForm.vue');

export default {
  name: 'BioactiveSubstanceAssignForm',

  components: {
    BioactiveSubstanceForm,
  },

  data() {
    return {
      dialog: false,
      loading: false,
      editingItem: {
        plantSpeciesId: this.$route.params.id,
        usefulPartId: null,
        bioactiveSubstanceId: null,
        content: '',
      },
      defaultItem: {
        plantSpeciesId: this.$route.params.id,
        usefulPartId: null,
        bioactiveSubstanceId: null,
        content: '',
      },
      errors: {},
      rules: {
        usefulPart: [(v) => !!v || 'Uporabni dio je obavezan'],
        bioactiveSubstance: [(v) => !!v || 'Bioaktivna tvar je obavezna'],
        content: [(v) => !!v || 'Sadržaj je obavezan'],
      },
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
      bioactiveSubstances: (state) => state.bioactiveSubstance.bioactiveSubstances,
      usefulParts: (state) => state.plantSpecies.usefulParts,
    }),
  },

  created() {
    if (!this.bioactiveSubstances.length) {
      this.loadBioactiveSubstances();
    }
    if (!this.usefulParts.length) {
      this.loadUsefulParts(this.$route.params.id);
    }
  },

  methods: {
    ...mapActions({
      loadBioactiveSubstances: 'bioactiveSubstance/loadAll',
      loadUsefulParts: 'plantSpecies/loadUsefulParts',
      addBioactiveSubstance: 'plantSpecies/addBioactiveSubstance',
    }),

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.loading = false;
        this.editingItem = { ...this.defaultItem };
        this.errors = {};
        this.$refs.form.resetValidation();
      }, 300);
    },

    async save() {
      try {
        this.loading = true;
        await this.addBioactiveSubstance(this.editingItem);
        this.close();
      } catch (error) {
        this.loading = false;
        this.errors = error.response.data.errors.reduce((map, object) => {
          const value = map;
          value[object.param] = object.msg;
          return value;
        }, {});
      }
    },
  },
};
</script>
