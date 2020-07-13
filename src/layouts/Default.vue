<template>
  <div class="fill-height bg-img">
    <v-app-bar app color="green" dark>
      <v-toolbar-title @click="goHome" class="c-pointer">
          VeleRi - <span class="text-uppercase">Biljne Vrste</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        color="white"
        text
        :to="{ name: 'PlantSpeciesHome' }"
        >
          Kontrolna Ploča
        </v-btn>
    </v-app-bar>
    <v-content class="fill-height">
      <v-container class="fill-height text-center" fluid>
        <v-row align="center" justify="center">
          <v-col>
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
export default {
  name: 'Default',

  methods: {
    goHome() {
      this.$router.push({
        name: 'Home',
      }).catch(() => {});
    },
  },
};
</script>

<style>
.bg-img {
  background: url("../assets/background.jpg") no-repeat center;
}
.c-pointer {
  cursor: pointer;
}
</style>
