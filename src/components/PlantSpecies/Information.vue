<template>
  <v-container>
    <v-row>
      <v-col class="col-12 col-md-6">
        <p class="title font-weight-regular mb-2">Latinski naziv</p>
        <p class="body-1 font-weight-regular">{{ plantSpecies.latinName }}</p>
      </v-col>
      <v-col class="col-12 col-md-6" >
        <p class="title font-weight-regular mb-2">Sinonim</p>
        <p class="body-1 font-weight-regular">{{ plantSpecies.synonym }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12 col-md-6">
        <p class="title font-weight-regular mb-2">Sistematičar</p>
        <p class="body-1 font-weight-regular">{{ systematist }}</p>
      </v-col>
      <v-col class="col-12 col-md-6">
        <p class="title font-weight-regular mb-2">Rod</p>
        <p class="body-1 font-weight-regular">{{ genus.name }}</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="title font-weight-regular mb-2">Botanička porodica (hrvatski / latinski naziv)</p>
        <p class="body-1 font-weight-regular" v-if="botanicalFamily">
          {{ botanicalFamily.croatianName }} /
          {{ botanicalFamily.latinName }}
        </p>
        <p class="body-1 font-weight-regular" v-else>
          Botanička porodica nije unesena
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="10">
        <p class="title font-weight-regular mb-2">Opis</p>
        <p class="body-1 font-weight-regular word-wrap">{{ descriptionSummary }}</p>
        <a
          @click="showSummary"
          v-if="plantSpecies.description.length > 500"
        >{{ summary ? 'Pročitaj više' : 'Pročitaj manje' }}</a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Information',

  data() {
    return {
      summary: true,
    };
  },

  computed: {
    ...mapState({
      plantSpecies: (state) => state.plantSpecies.singlePlantSpecies,
    }),

    systematist() {
      return this.plantSpecies.systematist ? this.plantSpecies.systematist.name : 'Nije unesen sistematičar';
    },

    botanicalFamily() {
      return this.plantSpecies.genus.botanicalFamily ? this.plantSpecies.genus.botanicalFamily : '';
    },

    genus() {
      return this.plantSpecies.genus ? this.plantSpecies.genus : 'Nije unesen rod';
    },

    descriptionSummary() {
      if (this.summary && this.plantSpecies.description.length > 500) {
        return `${this.plantSpecies.description.substring(0, 500)}...`;
      }
      return this.plantSpecies.description ? this.plantSpecies.description : 'Nije unesen opis';
    },
  },

  methods: {
    showSummary() {
      this.summary = !this.summary;
    },
  },
};
</script>

<style scoped>
.word-wrap{
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
