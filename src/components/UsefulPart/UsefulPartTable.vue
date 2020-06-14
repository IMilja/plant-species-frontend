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
      <v-col v-if="!usefulParts.length">
        <p class="headline text-center mt-5">Nema uporabnih dijelova</p>
      </v-col>
      <v-col v-if="usefulParts.length" cols="10">
        <v-data-table
          :headers="headers"
          :items="usefulParts"
          :expanded.sync="expanded"
          show-expand
          flat
        >
          <template v-slot:item.actions="{ item }">
            <v-btn x-small dark color="green lighten-1" class="elevation-0" link
              @click="editItem(item)"
            >
              Ažuriraj opis
            </v-btn>
            <v-btn x-small dark color="red lighten-1" class="elevation-0 ml-2" link
              @click="deleteItem(item)"
            >
              Izbriši
            </v-btn>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length" class="pa-5 text-justify">{{ item.description }}</td>
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
import UsefulPartForm from '@/components/UsefulPart/UsefulPartForm.vue';
import ConfirmDialog from '../general/ConfirmDialog.vue';

export default {
  name: 'UsefulPartTable',

  components: {
    UsefulPartForm,
    ConfirmDialog,
  },

  data() {
    return {
      loading: false,
      expanded: [],
      headers: [
        {
          text: 'Hrvatski naziv',
          align: 'start',
          sortable: false,
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
      usefulParts: (state) => state.plantSpecies.usefulParts,
    }),
  },

  async created() {
    this.loading = true;
    await this.loadUsefulParts(this.$route.params.id);
    this.loading = false;
  },

  methods: {
    ...mapActions({
      loadUsefulParts: 'plantSpecies/loadUsefulParts',
      deleteUsefulPart: 'plantSpecies/deleteUsefulPart',
      activeSnackbar: 'snackbar/activeSnackbar',
    }),

    async editItem(item) {
      const editingIndex = this.usefulParts.indexOf(item);
      this.$refs.form.edit(editingIndex, item);
    },

    async deleteItem(item) {
      try {
        if (await this.$refs.confirm.open(
          'Brisanje uporabnog dijela',
          `Jeste li sigurni da želite izbrisati uporabni dio "${item.croatianName}" ?`,
        )) {
          await this.deleteUsefulPart({
            plantSpeciesId: this.$route.params.id,
            usefulPartId: item.id,
          });
          this.activeSnackbar({
            color: 'success',
            isActive: true,
            text: `Uspješno izbrisan uporabni dio "${item.croatianName}"`,
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
