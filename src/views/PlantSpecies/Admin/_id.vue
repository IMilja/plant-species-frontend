<template>
  <v-card class="mx-auto" max-width="1500px" width="100%" flat>
    <v-container class="mt-5" fluid>
      <v-row v-if="!loading">
        <v-col>
          <h2 class="font-weight-bold display-2 text-center">{{ plantSpecies.croatianName }}</h2>
        </v-col>
      </v-row>
      <v-row v-if="!loading">
        <v-col cols="12" md="3">
          <v-navigation-drawer permanent>
            <v-list nav dense>
              <v-list-item-group>
                <v-list-item link :to="{ name: 'AdminPlantSpeciesView' }" color="green">
                  <v-list-item-content>
                    <v-list-item-title>Osnovne informacije</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link :to="{ name: 'AdminPlantSpeciesImages' }" color="green">
                  <v-list-item-content>
                    <v-list-item-title>Slike</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link :to="{ name: 'AdminPlantSpeciesUsefulParts' }" color="green">
                  <v-list-item-content>
                    <v-list-item-title>Uporabni dijelovi</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link :to="{name: 'AdminUsefulPartImages'}" color="green">
                  <v-list-item-content>
                    <v-list-item-title>Slike uporabnih dijelova</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link :to="{ name: 'AdminPlantSpeciesBioactiveSubstances' }"
                  color="green"
                >
                  <v-list-item-content>
                    <v-list-item-title>Bioaktivne tvari</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link :to="{ name: 'AdminPlantSpeciesSubspecies' }" color="green">
                  <v-list-item-content>
                    <v-list-item-title>Podvrste</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>
        </v-col>
        <v-col cols="12" md="9">
          <router-view></router-view>
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
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AdminPlantSpeciesView',

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState({
      plantSpecies: (state) => state.plantSpecies.singlePlantSpecies,
    }),
  },

  async created() {
    this.loading = true;
    await this.loadPlantSpecies(this.$route.params.id);
    this.loading = false;
  },

  methods: {
    ...mapActions({
      loadPlantSpecies: 'plantSpecies/loadSingle',
    }),
  },
};
</script>

<style>
</style>
