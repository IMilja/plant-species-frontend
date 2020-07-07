<template>
  <v-card class="mx-auto" max-width="1750px" min-height="800px" width="100%">
    <v-container fluid>
      <v-row class="justify-center px-5">
        <v-col>
          <h2 class="text-center font-weight-bold display-2 mb-3">
            Rezultati pretrage
          </h2>
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row class="px-5">
        <v-spacer></v-spacer>
        <v-col cols="12" md="6">
          <name-search></name-search>
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <v-row class="px-5">
        <v-col cols="12" md="3" class="order-2 order-md-1">
          <v-divider></v-divider>
          <additional-filters></additional-filters>
        </v-col>
        <v-col cols="12" md="9" class="pb-0 order-1 order-md-2">
          <plant-species-table
            :headers="headers"
            :loading="loading"
            :plant-species="plantSpecies"
            :is-admin="false"
            :is-elevated="false"
          ></plant-species-table>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import HTTP from '@/http-common.js';

const PlantSpeciesTable = () => import('@/components/PlantSpecies/PlantSpeciesTable.vue');
const NameSearch = () => import('@/components/Search/NameSearch.vue');
const AdditionalFilters = () => import('@/components/Search/AdditionalFilters.vue');

export default {
  name: 'PlantSpeciesHome',

  components: {
    PlantSpeciesTable,
    NameSearch,
    AdditionalFilters,
  },

  data() {
    return {
      loading: false,
      headers: [
        {
          text: 'Hrvatski naziv',
          align: 'start',
          sortable: true,
          value: 'croatianName',
        },
        {
          text: 'Latinski naziv',
          align: 'start',
          sortable: true,
          value: 'latinName',
        },
        {
          text: 'Sinonim',
          align: 'start',
          sortable: false,
          value: 'synonym',
        },
        {
          text: 'Botanička porodica (hrv. naziv)',
          align: 'start',
          sortable: false,
          value: 'bfCroatianName',
        },
        {
          text: 'Botanička porodica (lat. naziv)',
          align: 'start',
          sortable: false,
          value: 'bfLatinName',
        },
      ],
      plantSpecies: [],
    };
  },

  watch: {
    '$route.query': {
      immediate: true,
      deep: true,
      handler() {
        this.searchByQuery();
      },
    },
  },

  created() {
    this.searchByQuery();
  },

  methods: {
    async searchByQuery() {
      const {
        naziv,
        botanickePorodice,
        bioaktivneTvari,
        uporabniDijelovi,
      } = this.$route.query;

      let searchQuery = '';
      searchQuery += naziv ? `q=${naziv}&` : '';
      searchQuery += botanickePorodice ? `botanicalFamilies=${botanickePorodice}&` : '';
      searchQuery += bioaktivneTvari ? `bioactiveSubstances=${bioaktivneTvari}&` : '';
      searchQuery += uporabniDijelovi ? `usefulParts=${uporabniDijelovi}&` : '';

      this.loading = true;
      const response = await HTTP.get(`plant-species/search?${searchQuery}`);
      this.plantSpecies = response.data.data;
      this.loading = false;
    },
  },

};
</script>
