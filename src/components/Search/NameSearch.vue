<template>
  <v-text-field
    v-model="name"
    label="Unesite hrv/lat naziv biljne vrste"
    placeholder="npr. Borovica"
    color="green"
    @keydown.enter="searchByName"
  >
    <template v-slot:append-outer>
      <v-btn
        dark
        color="green"
        text
        medium
        @click="searchByName"
      >
        <span class="d-none d-md-inline">Pretraži</span>
        <v-icon class="ml-2" medium>
          mdi-magnify
        </v-icon>
      </v-btn>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: 'NameSearch',

  data() {
    return {
      name: this.$route.query.naziv,
    };
  },

  methods: {
    searchByName() {
      if (this.name && this.name !== this.$route.query.naziv) {
        this.$router.push({
          name: 'SearchResult',
          query: {
            naziv: this.name,
          },
        });
      }
    },
  },
};
</script>
