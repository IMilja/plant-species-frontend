<template>
  <v-container>
    <v-row>
      <v-col>
        <h2 class="text-center font-weight-bold display-2">{{ plantSpecies.croatianName }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-navigation-drawer permanent>
          <v-list nav dense>
            <v-list-item-group>
              <v-list-item link :to="{ name: 'PlantSpeciesView' }" color="blue">
                <v-list-item-content>
                  <v-list-item-title>Osnovne informacije</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link color="blue">
                <v-list-item-content>
                  <v-list-item-title>Slike</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link color="blue">
                <v-list-item-content>
                  <v-list-item-title>Uporabni dijelovi</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link color="blue">
                <v-list-item-content>
                  <v-list-item-title>Slike uporabnih dijelova</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link color="blue">
                <v-list-item-content>
                  <v-list-item-title>Bioaktivne substance</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link color="blue">
                <v-list-item-content>
                  <v-list-item-title>Podvrste</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-col>
      <v-col cols="8">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'PlantSpeciesView',

  computed: {
    ...mapState({
      plantSpecies: (state) => state.plantSpecies.singlePlantSpecies,
    }),
  },

  created() {
    this.loadPlantSpecies(this.$route.params.id);
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
