<template>
  <v-container fluid class="overflow-hidden">
    <v-row>
      <v-col>
        <h2 class="text-center font-weight-bold display-2">Rodovi</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" md="6">
        <v-divider></v-divider>
        <genus-table></genus-table>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import GenusTable from '@/components/Genus/GenusTable.vue';

export default {
  name: 'GeneraHome',

  components: {
    GenusTable,
  },

};
</script>

<style>

</style>
