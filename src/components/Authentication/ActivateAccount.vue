<template>
  <v-card flat class="pb-5" :loading="loading">
    <v-form>
      <v-toolbar color="green" dark flat>
        <v-toolbar-title>Izmjena lozinke</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-alert
        :type="msgType"
        dense
        v-if="msg"
        tile
      >
        {{ msg }}
      </v-alert>

      <v-row class="pt-10 px-5">
        <v-col cols="12" md="6">
          <v-text-field
            label="E-Mail adresa"
            placeholder="E-Mail adresa računa za aktivaciju"
            name="login"
            prepend-icon="mdi-account"
            type="text"
            color="green"
            v-model="activationData.email"
            :error-messages="errors.email"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Stara lozinka"
            placeholder="Trenuta lozinka računa"
            name="login"
            prepend-icon="mdi-lock"
            type="password"
            color="green"
            v-model="activationData.oldPassword"
            :error-messages="errors.oldPassword"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="px-5 mt-5">
        <v-col cols="12" md="6">
          <v-text-field
            label="Nova lozinka"
            placeholder="Unesite novu lozinku"
            name="login"
            prepend-icon="mdi-lock-open-check"
            type="password"
            color="green"
            v-model="activationData.newPassword"
            :error-messages="errors.newPassword"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Ponovite novu lozinku"
            placeholder="Ponovno unesite novu lozinku"
            name="login"
            prepend-icon="mdi-lock-open-check"
            type="password"
            color="green"
            v-model="activationData.repeatPassword"
            :error-messages="errors.repeatPassword"
          ></v-text-field>
        </v-col>
      </v-row>

    </v-form>
    <v-card-actions class="px-5 flex-column">
      <v-btn
        color="green"
        dark class="mx-auto"
        width="50%"
        @click="activateAccount"
      >
        Aktiviraj račun
      </v-btn>
      <a class="mt-3" @click="resetPassword">Zaboravili ste korisnički račun?</a>
    </v-card-actions>
  </v-card>
</template>

<script>
import HTTP from '@/http-common.js';

export default {
  name: 'ActivateAccount',

  data() {
    return {
      activationData: {
        email: '',
        oldPassword: '',
        newPassword: '',
        repeatPassword: '',
      },
      msg: '',
      msgType: '',
      errors: {},
      loading: false,
    };
  },

  methods: {
    async activateAccount() {
      const { activationHash } = this.$route.query;
      try {
        this.errors = {};
        this.loading = true;

        const response = await HTTP.put(`users/activate-account?activationHash=${activationHash}`, this.activationData);

        this.msgType = 'info';
        this.msg = response.data.msg;
        setTimeout(() => {
          this.$router.push({
            name: 'Login',
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
