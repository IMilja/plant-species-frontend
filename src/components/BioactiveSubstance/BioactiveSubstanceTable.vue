<template>
  <v-data-table
    :headers="headers"
    :items="bioactiveSubstances"
    :footer-props="{
      'items-per-page-text': 'Broj stavki po stranici'
    }"
    class="elevation-1"
  >
    <template v-slot:top v-if="isAdmin">
      <div class="mb-5">
        <bioactive-substance-assign-form></bioactive-substance-assign-form>
        <confirm-dialog ref="confirm"></confirm-dialog>
      </div>
    </template>
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
    <template v-slot:no-data>
      <span>Biljna vrsta nema dodijeljenih bioaktivnih tvari</span>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions } from 'vuex';

const BioactiveSubstanceAssignForm = () => import('@/components/BioactiveSubstance/BioactiveSubstanceAssignForm.vue');
const ConfirmDialog = () => import('@/components/general/ConfirmDialog.vue');

export default {
  name: 'BioactiveSubstanceTable',

  components: {
    BioactiveSubstanceAssignForm,
    ConfirmDialog,
  },

  props: {
    isAdmin: {
      type: Boolean,
      default: true,
    },
    bioactiveSubstances: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Array,
      default: () => [
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
    },
  },

  methods: {
    ...mapActions({
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
