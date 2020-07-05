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
        <plant-species-table></plant-species-table>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import PlantSpeciesTable from '@/components/PlantSpecies/PlantSpeciesTable.vue';

export default {
  name: 'AdminPlantSpeciesHome',

  components: {
    PlantSpeciesTable,
  },

};
</script>

<style>

</style>
