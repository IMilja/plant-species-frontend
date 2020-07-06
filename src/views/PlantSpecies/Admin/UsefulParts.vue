<template>
  <v-container>
    <v-row v-if="!loading">
      <v-col cols="12" md="10">
        <useful-part-table
          :useful-parts="usefulParts"
        ></useful-part-table>
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
import { mapState, mapActions } from 'vuex';

const UsefulPartTable = () => import('@/components/UsefulPart/UsefulPartTable.vue');

export default {
  name: 'AdminUsefulParts',

  components: {
    UsefulPartTable,
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState({
      usefulParts: (state) => state.plantSpecies.usefulParts,
    }),
  },

  async created() {
    this.loading = true;
    await this.loadUsefulParts(this.$route.params.id);
    this.loading = false;
  },

  methods: {
    ...mapActions({
      loadUsefulParts: 'plantSpecies/loadUsefulParts',
    }),
  },
};
</script>
