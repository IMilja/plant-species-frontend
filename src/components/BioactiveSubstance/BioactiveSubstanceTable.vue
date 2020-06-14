<template>
  <v-container>
    <v-row>
      <v-col>
        <bioactive-substance-assign-form></bioactive-substance-assign-form>
        <confirm-dialog ref="confirm"></confirm-dialog>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row v-if="!loading">
      <v-col v-if="!bioactiveSubstances.length">
        <p class="headline text-center mt-5">Nema bioaktivnih tvari</p>
      </v-col>
      <v-col v-if="bioactiveSubstances.length" cols="10">
        <v-data-table
          :headers="headers"
          :items="bioactiveSubstances"
          flat
        >
          <template v-slot:item.actions="{ item }">
            <v-btn
              dark
              class="elevation-0 ml-2"
              color="red lighten-1"
              x-small
              link
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
import BioactiveSubstanceAssignForm from '@/components/BioactiveSubstance/BioactiveSubstanceAssignForm.vue';
import ConfirmDialog from '../general/ConfirmDialog.vue';

export default {
  name: 'BioactiveSubstanceTable',

  components: {
    BioactiveSubstanceAssignForm,
    ConfirmDialog,
  },

  data() {
    return {
      loading: false,
      headers: [
        {
          text: 'Naziv',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        {
          text: 'Sadržaj',
          align: 'start',
          sortable: true,
          value: 'content',
        },
        {
          text: 'Mjerna veličina',
          align: 'start',
          sortable: false,
          value: 'measureUnitName',
        },
        {
          text: 'Nalazi se na uporabnom dijelu',
          align: 'start',
          sortable: false,
          value: 'usefulPartCroatianName',
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
      bioactiveSubstances: (state) => state.plantSpecies.bioactiveSubstances,
    }),
  },

  async created() {
    this.loading = true;
    await this.loadBioactiveSubnstaces(this.$route.params.id);
    this.loading = false;
  },

  methods: {
    ...mapActions({
      loadBioactiveSubnstaces: 'plantSpecies/loadBioactiveSubstances',
      deleteBioactiveSubstance: 'plantSpecies/deleteBioactiveSubstance',
      activeSnackbar: 'snackbar/activeSnackbar',
    }),

    async deleteItem(item) {
      try {
        if (await this.$refs.confirm.open(
          'Brisanje bioaktivne tvari',
          `Jeste li sigurni da želite izbrisati bioaktivnu tvar "${item.name}" ?`,
        )) {
          await this.deleteBioactiveSubstance({
            plantSpeciesId: this.$route.params.id,
            usefulPartId: item.usefulPartId,
            bioactiveSubstanceId: item.bioactiveSubstanceId,
          });
          this.activeSnackbar({
            color: 'success',
            isActive: true,
            text: `Uspješno izbrisana bioaktivna tvar "${item.name}"`,
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
