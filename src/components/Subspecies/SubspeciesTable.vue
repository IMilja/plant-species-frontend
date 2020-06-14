<template>
  <v-container>
    <v-row>
      <v-col>
        <useful-part-form ref="form"></useful-part-form>
        <confirm-dialog ref="confirm"></confirm-dialog>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row v-if="!loading">
      <v-col v-if="!subspecies.length">
        <p class="headline text-center mt-5">Nema podvrsta</p>
      </v-col>
      <v-col v-if="subspecies.length" cols="10">
        <v-data-table
          :headers="headers"
          :items="subspecies"
          flat
        >
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
      </v-col>
    </v-row>
    <v-row
      v-if="loading"
      class="fill-height ma-0"
      align="center"
      justify="center"
    >
      <v-progress-circular indeterminate color="green" size="100"></v-progress-circular>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UsefulPartForm from '@/components/Subspecies/SubspeciesForm.vue';
import ConfirmDialog from '../general/ConfirmDialog.vue';

export default {
  name: 'SubspeciesTable',

  components: {
    UsefulPartForm,
    ConfirmDialog,
  },

  data() {
    return {
      loading: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Naziv',
          align: 'start',
          sortable: true,
          value: 'name',
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
      subspecies: (state) => state.subspecies.subspecies,
    }),
  },

  async created() {
    this.loading = true;
    await this.loadSubspecies(this.$route.params.id);
    this.loading = false;
  },

  methods: {
    ...mapActions({
      loadSubspecies: 'subspecies/loadAll',
      deleteSubspecies: 'subspecies/delete',
      activeSnackbar: 'snackbar/activeSnackbar',
    }),

    async editItem(item) {
      const editingIndex = this.subspecies.indexOf(item);
      this.$refs.form.edit(editingIndex, item);
    },

    async deleteItem(item) {
      try {
        if (await this.$refs.confirm.open(
          'Brisanje podvrste',
          `Jeste li sigurni da želite izbrisati podvrstu "${item.name}" ?`,
        )) {
          await this.deleteSubspecies(item);
          this.activeSnackbar({
            color: 'success',
            isActive: true,
            text: `Uspješno izbrisana podvrsta "${item.name}"`,
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

<style>

</style>
