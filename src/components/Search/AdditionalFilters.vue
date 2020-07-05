<template>
  <v-container>
    <v-row>
      <v-col class="text-left">
        <span class="body-1">Dodatni filteri</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          v-model="selectedBotanicalFamilies"
          label="Odaberite botaničke porodice za filtriranje"
          placeholder="npr. Usnače"
          clearable
          multiple
          :items="botanicalFamilies"
          item-text="croatianName"
          item-value="id"
          color="green"
          item-color="green"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
          v-model="selectedBioactiveSubstances"
          label="Odaberite bioaktivne tvari za filtriranje"
          placeholder="npr. Eterično ulje"
          clearable
          multiple
          :items="bioactiveSubstances"
          item-text="name"
          item-value="id"
          color="green"
          item-color="green"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-select
            v-model="selectedUsefulParts"
            label="Odaberite uporabne dijelove za filtriranje"
            placeholder="npr. Nadzemni dio"
            clearable
            multiple
            :items="usefulParts"
            item-text="croatianName"
            item-value="id"
            color="green"
            item-color="green"
          ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          color="green"
          dark
          @click="search"
          width="100%"
        >
          Filtriraj
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AdditionalFilters',

  data() {
    return {
      selectedBotanicalFamilies: [],
      selectedBioactiveSubstances: [],
      selectedUsefulParts: [],
    };
  },

  watch: {
    '$route.query.botanickePorodice': {
      immediate: true,
      deep: true,
      handler() {
        const {
          botanickePorodice,
        } = this.$route.query;
        this.selectedBotanicalFamilies = botanickePorodice
          ? botanickePorodice.split(',').map((val) => parseInt(val, 0))
          : [];
      },
    },
    '$route.query.bioaktivneTvari': {
      immediate: true,
      deep: true,
      handler() {
        const {
          bioaktivneTvari,
        } = this.$route.query;
        this.selectedBioactiveSubstances = bioaktivneTvari
          ? bioaktivneTvari.split(',').map((val) => parseInt(val, 0))
          : [];
      },
    },
    '$route.query.uporabniDijelovi': {
      immediate: true,
      deep: true,
      handler() {
        const {
          uporabniDijelovi,
        } = this.$route.query;
        this.selectedUsefulParts = uporabniDijelovi
          ? uporabniDijelovi.split(',').map((val) => parseInt(val, 0))
          : [];
      },
    },
  },

  computed: {
    ...mapState({
      botanicalFamilies: (state) => state.botanicalFamily.botanicalFamilies,
      bioactiveSubstances: (state) => state.bioactiveSubstance.bioactiveSubstances,
      usefulParts: (state) => state.usefulPart.usefulParts,
    }),
  },

  created() {
    if (!this.botanicalFamilies.length) {
      this.loadBotanicalFamilies();
    }
    if (!this.bioactiveSubstances.length) {
      this.loadBioactiveSubstances();
    }
    if (!this.usefulParts.length) {
      this.loadUsefulParts();
    }
  },

  methods: {
    ...mapActions({
      loadBotanicalFamilies: 'botanicalFamily/loadAll',
      loadBioactiveSubstances: 'bioactiveSubstance/loadAll',
      loadUsefulParts: 'usefulPart/loadAll',
    }),

    search() {
      if (this.selectedBotanicalFamilies.length
        || this.selectedBioactiveSubstances.length
        || this.selectedUsefulParts.length
      ) {
        this.$router.push({
          name: 'SearchResult',
          query: {
            naziv: this.$route.query.naziv,
            botanickePorodice: this.selectedBotanicalFamilies.length
              ? this.selectedBotanicalFamilies.map((val) => val).join(',')
              : undefined,
            bioaktivneTvari: this.selectedBioactiveSubstances.length
              ? this.selectedBioactiveSubstances.map((val) => val).join(',')
              : undefined,
            uporabniDijelovi: this.selectedUsefulParts.length
              ? this.selectedUsefulParts.map((val) => val).join(',')
              : undefined,
          },
        }).catch(() => {});
      }
    },
  },
};
</script>
