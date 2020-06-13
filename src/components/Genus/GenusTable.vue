<template>
  <v-data-table
    :headers="headers"
    :items="genera"
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
          text: 'ID',
          align: 'start',
          sortable: true,
          value: 'id',
        },
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
    }),

    editItem(item) {
      const editingIndex = this.genera.indexOf(item);
      this.$refs.form.edit(editingIndex, item);
    },

    async deleteItem(item) {
      if (await this.$refs.confirm.open(
        'Brisanje biljne vrste',
        `Jeste li sigurni da želite izbrisati rod "${item.name}"`,
      )) {
        this.deleteGenus(item);
      }
    },
  },
};
</script>
