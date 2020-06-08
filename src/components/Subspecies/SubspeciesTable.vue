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
      <v-col v-if="subspecies.length">
        <v-data-table
          :headers="headers"
          :items="subspecies"
          :hide-default-footer="true"
          flat
        >
          <template v-slot:item.actions="{ item }">
            <v-btn x-small dark color="green lighten-1" class="elevation-0 ml-2" link
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
  name: 'UsefulPartTable',

  components: {
    UsefulPartForm,
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
    }),

    async editItem(item) {
      const editingIndex = this.subspecies.indexOf(item);
      this.$refs.form.edit(editingIndex, item);
    },

    async deleteItem(item) {
      if (await this.$refs.confirm.open(
        'Brisanje podvrste',
        `Jeste li sigurni da želite izbrisati podvrstu "${item.name}" ?`,
      )) {
        this.deleteSubspecies(item);
      }
    },
  },

};
</script>

<style>

</style>
