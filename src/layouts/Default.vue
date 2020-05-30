<template>
  <div class="fill-height bg-img">
    <v-app-bar
      app
      color="green"
      dark
    >
      <v-toolbar-title>Biljne Vrste</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="#AF4CAB"
        class="elevation-3"
        :to="{ name: 'AdminPanel' }"
      >
        Kontrolna Ploča
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  name: 'Default',

  methods: {

  },
};
</script>

<style>
  .bg-img {
    background: url('../assets/background.jpg') no-repeat center;
  }
</style>
