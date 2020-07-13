<template>
  <v-card class="mx-auto pa-0" width="100%" max-width="600px">
    <v-container fluid class="pa-0">
      <router-view></router-view>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'Authentication',
};
</script>
