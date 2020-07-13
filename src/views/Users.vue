<template>
<v-container fluid class="overflow-hidden">
    <v-row>
      <v-col>
        <h2 class="text-center font-weight-bold display-2">Korisnici</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="12" md="9">
        <v-divider></v-divider>
        <user-table></user-table>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script>
import UserTable from '@/components/Authentication/UsersTable.vue';

export default {
  name: 'Users',

  components: {
    UserTable,
  },
};
</script>
