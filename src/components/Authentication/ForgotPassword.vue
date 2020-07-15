<template>
  <v-card flat class="pb-5" :loading="loading">
    <v-form>
      <v-toolbar color="green" dark flat>
        <v-toolbar-title>Zaboravljena lozinka</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-alert
        dense
        :type="msgType"
        v-if="msg"
        tile
      >
        {{ msg }}
      </v-alert>

      <v-text-field
        label="E-Mail adresa"
        placeholder="Unesite vašu E-mail adresu"
        name="login"
        prepend-icon="mdi-account"
        type="text"
        color="green"
        class="px-5 pt-10"
        v-model="email"
        :error-messages="errors.email"
      ></v-text-field>

    </v-form>
    <v-card-actions class="px-5 flex-column">
      <v-btn
        color="green"
        dark class="mx-auto"
        width="50%"
        @click="sendResetPassword"
      >
        Resetiraj lozinku
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import HTTP from '@/http-common.js';

export default {
  name: 'ForgotPassword',

  data() {
    return {
      email: '',
      msg: '',
      msgType: '',
      errors: {},
      loading: false,
    };
  },

  methods: {
    async sendResetPassword() {
      try {
        this.errors = {};
        this.loading = true;

        const response = await HTTP.post('users/forgot-password', {
          email: this.email,
        });

        this.msgType = 'info';
        this.msg = response.data.msg;
        setTimeout(() => {
          this.$router.push({
            name: 'Home',
          });
        }, 1500);
      } catch (error) {
        if (error.response.data.errors) {
          this.errors = error.response.data.errors.reduce((map, object) => {
            const value = map;
            value[object.param] = object.msg;
            return value;
          }, {});
        } else {
          this.msgType = 'error';
          this.msg = error.response.data.msg;
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>

</style>
