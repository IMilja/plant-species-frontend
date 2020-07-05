<template>
  <v-data-table
    :headers="headers"
    :items="botanicalFamilies"
    :loading="loading"
    :footer-props="{
      'items-per-page-text': 'Broj stavki po stranici'
    }"
    class="mt-7 elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-spacer></v-spacer>
        <confirm-dialog ref="confirm"></confirm-dialog>
        <botanical-family-form ref="form"></botanical-family-form>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn x-small dark color="green" class="elevation-0 ml-2" link
        @click="editItem(item)"
      >
        Ažuriraj
      </v-btn>
      <v-btn x-small dark color="red lighten-1" class="elevation-0 ml-2" link
        @click="deleteItem(item)"
      >
        Izbriši
      </v-btn>
    </template>
    <template v-slot:no-data>
      <span>Nema unesenih botaničkih porodica</span>
    </template>
  </v-data-table>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ConfirmDialog from '@/components/general/ConfirmDialog.vue';
import BotanicalFamilyForm from '@/components/BotanicalFamily/BotanicalFamilyForm.vue';

export default {
  name: 'BotanicalFamilyTable',


  components: {
    ConfirmDialog,
    BotanicalFamilyForm,
  },

  data() {
    return {
      loading: false,
      headers: [
        {
          text: 'Hrvatski naziv',
          align: 'start',
          sortable: true,
          value: 'croatianName',
        },
        {
          text: 'Latinski naziv',
          align: 'start',
          sortable: false,
          value: 'latinName',
        },
        {
          text: 'Akcije',
          align: 'end',
          sortable: false,
          value: 'actions',
        },
      ],
    };
  },

  computed: {
    ...mapState({
      botanicalFamilies: (state) => state.botanicalFamily.botanicalFamilies,
    }),
  },

  async created() {
    if (!this.botanicalFamilies.length) {
      this.loading = true;
      await this.loadBotanicalFamilies();
      this.loading = false;
    }
  },

  methods: {
    ...mapActions({
      loadBotanicalFamilies: 'botanicalFamily/loadAll',
      deleteBotanicalFamily: 'botanicalFamily/delete',
      activeSnackbar: 'snackbar/activeSnackbar',
    }),

    editItem(item) {
      const editingIndex = this.botanicalFamilies.indexOf(item);
      this.$refs.form.edit(editingIndex, item);
    },

    async deleteItem(item) {
      try {
        if (await this.$refs.confirm.open(
          'Brisanje bioaktivne tvari',
          `Jeste li sigurni da želite izbrisati bioaktivnu tvar "${item.croatianName}" ?`,
        )) {
          await this.deleteBotanicalFamily(item);
          this.activeSnackbar({
            color: 'success',
            isActive: true,
            text: `Uspješno izbrisana botanička porodica "${item.croatianName}"`,
          });
        }
      } catch (error) {
        if (error.response.status === 409) {
          this.activeSnackbar({
            color: 'error',
            isActive: true,
            text: 'Došlo je do pogreške prilikom brisanja',
          });
        }
      }
    },
  },
};
</script>
