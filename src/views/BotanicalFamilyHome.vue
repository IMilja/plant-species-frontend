<template>
  <v-container fluid class="overflow-hidden">
    <v-row>
      <v-col>
        <h2 class="text-center font-weight-bold display-2">Botanička porodice</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" md="9">
        <v-divider></v-divider>
        <botanical-family-table></botanical-family-table>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
const BotanicalFamilyTable = () => import('@/components/BotanicalFamily/BotanicalFamilyTable.vue');

export default {
  name: 'BotanicalFamilyHome',

  components: {
    BotanicalFamilyTable,
  },

};
</script>

<style>

</style>
