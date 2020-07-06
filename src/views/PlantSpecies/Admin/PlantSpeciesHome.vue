<template>
  <v-container fluid class="overflow-hidden">
    <v-row>
      <v-col>
        <h2 class="text-center font-weight-bold display-2">Biljne vrste</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" md="9">
        <v-divider></v-divider>
        <plant-species-table
          :plant-species="plantSpecies"
          :loading="loading"
        ></plant-species-table>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

const PlantSpeciesTable = () => import('@/components/PlantSpecies/PlantSpeciesTable.vue');

export default {
  name: 'AdminPlantSpeciesHome',

  components: {
    PlantSpeciesTable,
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState({
      plantSpecies: (state) => state.plantSpecies.plantSpecies,
    }),
  },

  async created() {
    this.loading = true;
    await this.loadPlantSpecies();
    this.loading = false;
  },

  methods: {
    ...mapActions({
      loadPlantSpecies: 'plantSpecies/loadAll',
    }),
  },

};
</script>
