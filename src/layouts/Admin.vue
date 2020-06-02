<template>
  <v-layout>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      app
      overflow
    >
      <v-list>
        <v-list-item link to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Početna Stranica</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'PlantSpeciesHome' }">
          <v-list-item-action>
            <v-icon>mdi-flower</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Biljne vrste</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="green"
      dark
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Kontrolna Ploča</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn class="elevation-3" :to="{ name: 'Home' }">Odjavi se</v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-layout>
</template>

<script>
export default {
  name: 'Admin',

  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style>

</style>
