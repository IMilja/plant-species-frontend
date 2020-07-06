<template>
  <v-container>
    <v-row v-if="!loading">
      <v-col cols="12" md="10">
        <subspecies-table
          :headers="headers"
          :subspecies="subspecies"
          :is-admin="false"
        ></subspecies-table>
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

const SubspeciesTable = () => import('@/components/Subspecies/SubspeciesTable.vue');

export default {
  name: 'SearchSubspecies',

  components: {
    SubspeciesTable,
  },

  data() {
    return {
      loading: false,
      headers: [
        {
          text: 'Naziv',
          align: 'start',
          sortable: true,
          value: 'name',
        },
      ],
    };
  },

  computed: {
    ...mapState({
      subspecies: (state) => state.subspecies.subspecies,
    }),
  },

  async created() {
    this.loading = true;
    await this.loadSubspecies(this.$route.params.id);
    this.loading = false;
  },

  methods: {
    ...mapActions({
      loadSubspecies: 'subspecies/loadAll',
    }),
  },

};
</script>
