<template>
  <v-container fluid>
    <v-row>
      <v-col class="col-12 col-lg-6">
        <p class="title font-weight-regular mb-2">Latinski naziv</p>
        <p class="body-1 font-weight-regular">{{ plantSpecies.latinName }}</p>
      </v-col>
      <v-col class="col-12 col-lg-6" >
        <p class="title font-weight-regular mb-2">Sinonim</p>
        <p class="body-1 font-weight-regular">{{ plantSpecies.synonym }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12 col-lg-6">
        <p class="title font-weight-regular mb-2">Sistematičar</p>
        <p class="body-1 font-weight-regular">{{ plantSpecies.systematist.name }}</p>
      </v-col>
      <v-col class="col-12 col-lg-6">
        <p class="title font-weight-regular mb-2">Rod</p>
        <p class="body-1 font-weight-regular">{{ plantSpecies.genus.name }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12">
        <p class="title font-weight-regular mb-2">Botanička porodica (hrvatski / latinski naziv)</p>
        <p class="body-1 font-weight-regular">
          {{ plantSpecies.genus.botanicalFamily.croatianName }} /
          {{ plantSpecies.genus.botanicalFamily.latinName }}
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="title font-weight-regular mb-2">Opis</p>
        <p class="body-1 font-weight-regular word-wrap">{{ descriptionSummary }}</p>
        <a
          @click="showSummary"
          v-if="plantSpecies.description.length > 300"
        >{{ summary ? 'Pročitaj više' : 'Pročitaj manje' }}</a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PlantSpeciesBasicInfo',
  data() {
    return {
      summary: true,
    };
  },

  computed: {
    ...mapState({
      plantSpecies: (state) => state.plantSpecies.singlePlantSpecies,
    }),

    descriptionSummary() {
      if (this.summary && this.plantSpecies.description.length > 300) {
        return `${this.plantSpecies.description.substring(0, 300)}...`;
      }
      return this.plantSpecies.description;
    },
  },

  methods: {
    showSummary() {
      this.summary = !this.summary;
    },
  },
};
</script>

<style>
.word-wrap{
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
