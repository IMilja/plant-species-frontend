<template>
  <v-container>
    <v-row v-if="!loading">
      <v-col cols="12" md="10">
        <bioactive-substance-table
          :bioactive-substances="bioactiveSubstances"
        ></bioactive-substance-table>
      </v-col>
    </v-row>
    <v-row
      v-if="loading"
      class="fill-height ma-0"
      align="center"
      justify="center"
    >
      <v-progress-circular indeterminate color="green" size="100"></v-progress-circular>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

const BioactiveSubstanceTable = () => import('@/components/BioactiveSubstance/BioactiveSubstanceTable.vue');

export default {
  name: 'AdminBioactiveSubstances',

  components: {
    BioactiveSubstanceTable,
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState({
      bioactiveSubstances: (state) => state.plantSpecies.bioactiveSubstances,
    }),
  },

  async created() {
    this.loading = true;
    await this.loadBioactiveSubstances(this.$route.params.id);
    this.loading = false;
  },

  methods: {
    ...mapActions({
      loadBioactiveSubstances: 'plantSpecies/loadBioactiveSubstances',
    }),
  },
};
</script>

<style>

</style>
