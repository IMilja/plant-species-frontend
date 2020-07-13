<template>
  <v-card class="pb-5" :loading="loading">
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

      <v-text-field
        label="Nova lozinka"
        placeholder="Unesite novu lozinku"
        name="login"
        prepend-icon="mdi-lock-open-check"
        type="password"
        color="green"
        class="px-5 pt-5"
        v-model="resetForm.newPassword"
        :error-messages="errors.newPassword"
      ></v-text-field>

      <v-text-field
        label="Ponovite novu lozinku"
        placeholder="Ponovno unesite novu lozinku"
        name="login"
        prepend-icon="mdi-lock-open-check"
        type="password"
        color="green"
        class="px-5 pt-5"
        v-model="resetForm.repeatPassword"
        :error-messages="errors.repeatPassword"
      ></v-text-field>

    </v-form>
    <v-card-actions class="px-5 flex-column">
      <v-btn
        color="green"
        dark class="mx-auto"
        width="50%%"
        @click="resetPassword"
      >
        Promejni lozinku
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import HTTP from '@/http-common.js';

export default {
  name: 'ResetPassword',

  data() {
    return {
      resetForm: {
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
    async resetPassword() {
      const { passwordResetHash } = this.$route.query;
      try {
        this.errors = {};
        this.loading = true;

        const response = await HTTP.put(`users/forgot-password?passwordResetHash=${passwordResetHash}`, this.resetForm);

        this.msg = response.data.msg;
        this.msgType = 'info';
        setTimeout(() => {
          this.$router.replace({
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
  },
};
</script>
