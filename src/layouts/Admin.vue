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
        <v-list-item link :to="{ name: 'GeneraHome' }">
          <v-list-item-action>
            <v-icon>mdi-spa</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Rodovi</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'BotanicalFamilyHome' }">
          <v-list-item-action>
            <v-icon>mdi-flower-poppy</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Botanička porodice</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="{ name: 'Users' }" v-if="isSuperAdmin">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Korisnici</v-list-item-title>
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
      <v-btn
        color="white"
        text
        @click="logoutUser"
      >
        Odjavi se
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
      <v-snackbar
        v-model="snackbar.isActive"
        :timeout="2500"
        :color="snackbar.color"
        class="text-center"
      >
        {{ snackbar.text }}
      </v-snackbar>
    </v-content>
  </v-layout>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'Admin',

  data() {
    return {
      drawer: null,
    };
  },

  computed: {
    ...mapState({
      snackbar: (state) => state.snackbar.snackbar,
    }),
    ...mapGetters({
      isSuperAdmin: 'users/isSuperAdmin',
    }),
  },

  methods: {
    ...mapActions({
      logout: 'users/logout',
    }),
    logoutUser() {
      this.logout();
      this.$router.push({
        replace: true,
        name: 'Home',
      });
    },
  },
};
</script>
