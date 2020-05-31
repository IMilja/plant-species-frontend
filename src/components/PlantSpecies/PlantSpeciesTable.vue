<template>
  <v-data-table
    :headers="headers"
    :items="plantSpecies"
    class="mt-7 elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-spacer></v-spacer>
        <confirm-dialog ref="confirm"></confirm-dialog>
        <plant-species-form ref="form"></plant-species-form>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn x-small dark color="blue" class="elevation-0 ml-2" link
        @click="viewItem(item)"
      >
        Pogled
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
      <span>Nema podataka</span>
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
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
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
          text: 'Sinonim',
          align: 'start',
          sortable: false,
          value: 'synonym',
        },
        {
          text: 'Botanička porodica',
          align: 'start',
          sortable: false,
          value: 'genus.botanicalFamily.croatianName',
        },
        {
          text: 'Akcije',
          align: 'center',
          sortable: false,
          value: 'actions',
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
      deletePlantSpcies: 'plantSpecies/delete',
    }),

    viewItem(item) {
      console.log(item);
    },

    editItem(item) {
      const editingIndex = this.plantSpecies.indexOf(item);
      this.$refs.form.edit(editingIndex, item);
    },

    async deleteItem(item) {
      if (await this.$refs.confirm.open(
        'Brisanje biljne vrste',
        `Jeste li sigurni da želite izbrisati biljnu vrstu "${item.croatianName}"`,
      )) {
        this.deletePlantSpcies(item);
      }
    },
  },

  created() {
    this.loadPlantSpecies();
  },

};
</script>
