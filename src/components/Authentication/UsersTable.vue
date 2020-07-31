<template>
  <v-data-table
    :headers="headers"
    :items="users"
    item-key="id"
    :loading="loading"
  >
  <template v-slot:top>
    <v-toolbar flat color="white">
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="350px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="green"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
          >Unesi novog korisnika</v-btn>
        </template>
        <v-card :loading="formLoading">
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-alert dense v-if="error" tile type="error">
              {{ error }}
            </v-alert>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    label="E-Mail korisnika"
                    placeholder="Unesite e-mail novoga korisnika"
                    v-model="editingItem.email"
                    :error-messages="errors.email"
                    :disabled="editingIndex !== -1"
                    color="green"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select
                    :items="roles"
                    label="Uloga"
                    placeholder="Odaberite ulogu korisnika"
                    item-text="name"
                    item-value="id"
                    v-model="editingItem.roleId"
                    :error-messages="errors.roleId"
                    color="green"
                    item-color="green"
                  >
                    <template v-slot:no-data>
                      <span class="px-2">Nema uloga</span>
                    </template>
                  </v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="close">Prekid</v-btn>
            <v-btn color="blue" text @click="save">Spremi</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
  </template>
  <template v-slot:item.actions="{ item }">
      <v-btn x-small dark color="green" class="elevation-0 ml-2" link
        @click="changeRole(item)"
      >
        Promjeni ulogu
      </v-btn>
    </template>
    <template v-slot:no-data>
      <span>Nema unesenih botaničkih porodica</span>
    </template>
  </v-data-table>
</template>

<script>
import HTTP from '@/http-common.js';

export default {
  name: 'UserTable',

  data() {
    return {
      headers: [
        {
          text: 'E-Mail',
          align: 'start',
          sortable: true,
          value: 'email',
        },
        {
          text: 'Uloga',
          align: 'start',
          sortable: false,
          value: 'role.name',
        },
        {
          text: 'Akcije',
          align: 'end',
          sortable: false,
          value: 'actions',
        },
      ],
      users: [],
      roles: [],
      loading: false,
      formLoading: false,
      dialog: false,
      editingIndex: -1,
      editingItem: {
        email: '',
        roleId: null,
      },
      defaultItem: {
        email: '',
        roleId: null,
      },
      error: '',
      errors: {},
    };
  },

  computed: {
    formTitle() {
      return this.editingIndex === -1 ? 'Unos novog korisnika' : 'Ažuriranje uloge';
    },
  },

  async created() {
    this.loading = true;
    const response = await HTTP.get('users');
    const rolesResponse = await HTTP.get('roles');
    this.users = response.data.data;
    this.roles = rolesResponse.data.data;
    this.loading = false;
  },

  methods: {
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editingIndex = -1;
        this.errors = {};
        this.error = '';
        this.editingItem = { ...this.defaultItem };
      }, 300);
    },

    changeRole(item) {
      this.editingIndex = this.users.indexOf(item);
      this.editingItem = { ...item };
      this.dialog = true;
    },

    async save() {
      try {
        this.errors = {};
        this.formLoading = true;
        if (this.editingIndex === -1) {
          const response = await HTTP.post('users', this.editingItem);
          this.users.push(response.data.data);
        } else {
          const response = await HTTP.patch(`users/${this.editingItem.id}`, this.editingItem);
          const user = response.data.data;

          const index = this.users.findIndex((u) => u.id === user.id);

          if (index !== -1) {
            this.users.splice(index, 1, user);
          }
        }
        this.close();
      } catch (error) {
        if (error.response.data.errors) {
          this.errors = error.response.data.errors.reduce((map, object) => {
            const value = map;
            value[object.param] = object.msg;
            return value;
          }, {});
        } else if (error.response.status === 409) {
          this.error = 'E-mail je zauzet';
        }
      } finally {
        this.formLoading = false;
      }
    },
  },
};
</script>

<style>

</style>
