<template>
  <v-data-table
    :headers="headers"
    :items="genera"
    :footer-props="{
      'items-per-page-text': 'Broj stavki po stranici'
    }"
    class="mt-7 elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-spacer></v-spacer>
        <confirm-dialog ref="confirm"></confirm-dialog>
        <genus-form ref="form"></genus-form>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn x-small dark color="green lighten-1" class="elevation-0" link
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
      <span>Nema unesenih rodova</span>
    </template>
  </v-data-table>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import GenusForm from '@/components/Genus/GenusForm.vue';
import ConfirmDialog from '@/components/general/ConfirmDialog.vue';

export default {
  name: 'GenusTable',

  components: {
    GenusForm,
    ConfirmDialog,
  },

  data() {
    return {
      loading: false,
      headers: [
        {
          text: 'Naziv',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Botanička porodica (hrv. naziv)',
          align: 'start',
          sortable: false,
          value: 'botanicalFamily.croatianName',
        },
        {
          text: 'Botanička porodica (lat. naziv)',
          align: 'start',
          sortable: false,
          value: 'botanicalFamily.latinName',
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
      genera: (state) => state.genus.genera,
    }),
  },

  async created() {
    this.loading = true;
    await this.loadGenera();
    this.loading = false;
  },

  methods: {
    ...mapActions({
      loadGenera: 'genus/loadAll',
      deleteGenus: 'genus/delete',
      activeSnackbar: 'snackbar/activeSnackbar',
    }),

    editItem(item) {
      const editingIndex = this.genera.indexOf(item);
      this.$refs.form.edit(editingIndex, item);
    },

    async deleteItem(item) {
      try {
        if (await this.$refs.confirm.open(
          'Brisanje biljne vrste',
          `Jeste li sigurni da želite izbrisati rod "${item.name}"`,
        )) {
          await this.deleteGenus(item);
          this.activeSnackbar({
            color: 'success',
            isActive: true,
            text: `Uspješno izbrisana rod "${item.name}"`,
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
