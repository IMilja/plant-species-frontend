<template>
  <v-data-table
    :headers="headers"
    :items="plantSpecies"
    :footer-props="{
      'items-per-page-text': 'Broj stavki po stranici'
    }"
    class="mt-7 elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-spacer></v-spacer>
        <confirm-dialog ref="confirm"></confirm-dialog>
        <plant-species-form ref="form"></plant-species-form>
      </v-toolbar>
    </template>
    <template v-slot:item.croatianName="{ item }">
      <a @click="viewItem(item)" class="info--text">
        {{item.croatianName}}
      </a>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn x-small dark color="info" class="elevation-0" link
        @click="viewItem(item)"
      >
        Pregled
      </v-btn>
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
      <span>Nema unesenih biljnih vrsta</span>
    </template>
  </v-data-table>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PlantSpeciesForm from './PlantSpeciesForm.vue';
import ConfirmDialog from '../general/ConfirmDialog.vue';

export default {
  name: 'PlantSpeciesTable',

  components: {
    PlantSpeciesForm,
    ConfirmDialog,
  },

  data() {
    return {
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
          sortable: true,
          value: 'latinName',
        },
        {
          text: 'Sinonim',
          align: 'start',
          sortable: false,
          value: 'synonym',
        },
        {
          text: 'Botanička porodica (hrv. naziv)',
          align: 'start',
          sortable: false,
          value: 'genus.botanicalFamily.croatianName',
        },
        {
          text: 'Akcije',
          align: 'end',
          sortable: false,
          value: 'actions',
          width: '30%',
        },
      ],
    };
  },

  computed: {
    ...mapState({
      plantSpecies: (state) => state.plantSpecies.plantSpecies,
    }),
  },

  methods: {
    ...mapActions({
      loadPlantSpecies: 'plantSpecies/loadAll',
      deletePlantSpecies: 'plantSpecies/delete',
      activeSnackbar: 'snackbar/activeSnackbar',
    }),

    viewItem(item) {
      this.$router.push({
        name: 'PlantSpeciesView',
        params: {
          id: item.id,
        },
      });
    },

    editItem(item) {
      const editingIndex = this.plantSpecies.indexOf(item);
      this.$refs.form.edit(editingIndex, item);
    },

    async deleteItem(item) {
      try {
        if (await this.$refs.confirm.open(
          'Brisanje biljne vrste',
          `Jeste li sigurni da želite izbrisati biljnu vrstu "${item.croatianName}"`,
        )) {
          await this.deletePlantSpecies(item);
          this.activeSnackbar({
            color: 'success',
            isActive: true,
            text: `Uspješno izbrisana biljna vrsta "${item.croatianName}"`,
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

  created() {
    this.loadPlantSpecies();
  },

};
</script>
