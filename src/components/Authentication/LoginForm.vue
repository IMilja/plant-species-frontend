<template>
  <v-card flat class="pb-5" :loading="loading">
    <v-form>
      <v-toolbar color="green" dark flat>
        <v-toolbar-title>Prijava</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-alert
        type="error"
        dense
        v-if="error"
        tile
      >
        {{ error }}
      </v-alert>
      <v-text-field
        label="E-Mail adresa"
        placeholder="Unesite vaš e-mail"
        name="login"
        prepend-icon="mdi-account"
        type="text"
        color="green"
        class="px-5 pt-10"
        v-model="loginData.email"
        :error-messages="errors.email"
        @keypress.enter="login"
      ></v-text-field>

      <v-text-field
        label="Lozinka"
        placeholder="Unesite vašu lozinku"
        name="password"
        prepend-icon="mdi-lock"
        type="password"
        color="green"
        class="px-5"
        v-model="loginData.password"
        :error-messages="errors.password"
        @keypress.enter="login"
      ></v-text-field>
    </v-form>
    <v-card-actions class="px-5 flex-column">
      <v-btn color="green" dark class="mx-auto" width="50%" @click="login">Prijavi se</v-btn>
      <a class="mt-3" @click="resetPassword">Zaboravili ste korisnički račun?</a>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginForm',

  data() {
    return {
      loginData: {
        email: '',
        password: '',
      },
      error: '',
      errors: {},
      loading: false,
    };
  },

  methods: {
    ...mapActions({
      loginUser: 'users/login',
    }),

    async login() {
      try {
        this.errors = {};
        this.loading = true;

        await this.loginUser(this.loginData);
        this.$router.replace({
          name: 'PlantSpeciesHome',
        });
      } catch (error) {
        if (error.response.data.errors) {
          this.errors = error.response.data.errors.reduce((map, object) => {
            const value = map;
            value[object.param] = object.msg;
            return value;
          }, {});
        } else {
          this.error = error.response.data.msg;
        }
      } finally {
        this.loading = false;
      }
    },

    resetPassword() {
      this.$router.push({
        name: 'ForgotPassword',
      });
    },
  },
};
</script>

<style>
</style>
