<template>
  <v-card class="mx-auto" max-width="55%">
    <v-card-title>
      <h1 class="mx-auto mt-5 text-uppercase">Pretraga biljnih vrsta</h1>
    </v-card-title>
    <v-card-text class="px-0 pt-0">
      <h2 class="subtitle mb-2">Odaberite kategoriju pretrage</h2>
      <v-tabs
        v-model="tab"
        background-color="green"
        dark
        icons-and-text
        class="mt-1"
        grow
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#tab-1">
          Biljna vrsta
          <v-icon>mdi-flower</v-icon>
        </v-tab>
        <v-tab href="#tab-2">
          Botanička Porodica
          <v-icon>mdi-flower</v-icon>
        </v-tab>
        <v-tab href="#tab-3">
          Bioaktivna tvar
          <v-icon>mdi-spa</v-icon>
        </v-tab>
        <v-tab href="#tab-4">
          Uporabni dio
          <v-icon>mdi-sprout</v-icon>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <v-card flat class="py-3 px-10">
            <v-card-text>
              <name-search></name-search>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item value="tab-2">
          <v-card flat class="py-3 px-10">
            <v-card-text>
              <v-select
                v-model="selectedBotanicalFamilies"
                label="Odaberite botaničke porodice za pretragu"
                placeholder="npr. Usnače"
                clearable
                multiple
                :items="botanicalFamilies"
                item-text="croatianName"
                color="green"
                item-color="green"
                return-object
              >
                <template v-slot:append-outer>
                  <v-btn
                    dark
                    color="green"
                    text
                    medium
                    @click="searchByBotanicalFamily"
                  >
                    <span class="d-none d-md-inline">Pretraži</span>
                    <v-icon class="ml-2" medium>
                      mdi-magnify
                    </v-icon>
                  </v-btn>
                </template>
              </v-select>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item value="tab-3">
          <v-card flat class="py-3 px-10">
            <v-card-text>
              <v-select
                v-model="selectedBioactiveSubstances"
                label="Odaberite bioaktivne tvari za pretragu"
                placeholder="npr. Eterično ulje"
                clearable
                multiple
                :items="bioactiveSubstances"
                item-text="name"
                color="green"
                item-color="green"
                return-object
              >
                <template v-slot:append-outer>
                  <v-btn
                    dark
                    color="green"
                    text
                    medium
                    @click="searchByBioactiveSubstance"
                  >
                    <span class="d-none d-md-inline">Pretraži</span>
                    <v-icon class="ml-2" medium>
                      mdi-magnify
                    </v-icon>
                  </v-btn>
                </template>
              </v-select>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item value="tab-4">
          <v-card flat class="py-3 px-10">
            <v-card-text>
              <v-select
                v-model="selectedUsefulParts"
                label="Odaberite uporabne dijelove za pretragu"
                placeholder="npr. Nadzemni dio"
                clearable
                multiple
                :items="usefulParts"
                item-text="croatianName"
                color="green"
                item-color="green"
                return-object
              >
                <template v-slot:append-outer>
                  <v-btn
                    dark
                    color="green"
                    text
                    medium
                    @click="searchByUseulPart"
                  >
                    <span class="d-none d-md-inline">Pretraži</span>
                    <v-icon class="ml-2" medium>
                      mdi-magnify
                    </v-icon>
                  </v-btn>
                </template>
              </v-select>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';

const NameSearch = () => import('@/components/Search/NameSearch.vue');

export default {
  name: 'SearchForm',


  components: {
    NameSearch,
  },

  computed: {
    ...mapState({
      botanicalFamilies: (state) => state.botanicalFamily.botanicalFamilies,
      bioactiveSubstances: (state) => state.bioactiveSubstance.bioactiveSubstances,
      usefulParts: (state) => state.usefulPart.usefulParts,
    }),
  },

  data() {
    return {
      tab: null,
      selectedBotanicalFamilies: [],
      selectedBioactiveSubstances: [],
      selectedUsefulParts: [],
    };
  },

  created() {
    if (!this.botanicalFamilies.length) {
      this.loadBotanicalFamilies();
    }
    if (!this.bioactiveSubstances.length) {
      this.loadBioactiveSubstances();
    }
    if (!this.usefulParts.length) {
      this.loadUsefulParts();
    }
  },

  methods: {
    ...mapActions({
      loadBotanicalFamilies: 'botanicalFamily/loadAll',
      loadBioactiveSubstances: 'bioactiveSubstance/loadAll',
      loadUsefulParts: 'usefulPart/loadAll',
    }),

    searchByBotanicalFamily() {
      if (this.selectedBotanicalFamilies.length) {
        this.$router.push({
          name: 'SearchResult',
          query: {
            botanickePorodice: this.selectedBotanicalFamilies.map((val) => val.id).join(','),
          },
        }).catch(() => {});
      }
    },

    searchByBioactiveSubstance() {
      if (this.selectedBioactiveSubstances.length) {
        this.$router.push({
          name: 'SearchResult',
          query: {
            bioaktivneTvari: this.selectedBioactiveSubstances.map((val) => val.id).join(','),
          },
        }).catch(() => {});
      }
    },

    searchByUseulPart() {
      if (this.selectedUsefulParts.length) {
        this.$router.push({
          name: 'SearchResult',
          query: {
            uporabniDijelovi: this.selectedUsefulParts.map((val) => val.id).join(','),
          },
        }).catch(() => {});
      }
    },
  },
};
</script>
