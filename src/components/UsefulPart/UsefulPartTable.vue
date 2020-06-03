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
      <v-col v-if="usefulParts.length">
        <v-data-table
          :headers="headers"
          :items="usefulParts"
          :hide-default-footer="true"
          :expanded.sync="expanded"
          show-expand
          flat
        >
          <template v-slot:item.actions="{ item }">
            <v-btn x-small dark color="green lighten-1" class="elevation-0 ml-2" link
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
          align: 'center',
          sortable: false,
          value: 'actions',
        },
      ],
    };
  },

  computed: {
    ...mapState({
      usefulParts: (state) => state.usefulPart.usefulParts,
    }),
  },

  async created() {
    this.loading = true;
    await this.loadUsefulParts(this.$route.params.id);
    this.loading = false;
  },

  methods: {
    ...mapActions({
      loadUsefulParts: 'usefulPart/loadUsefulParts',
      deleteUsefulPart: 'usefulPart/delete',
    }),

    async editItem(item) {
      const editingIndex = this.usefulParts.indexOf(item);
      this.$refs.form.edit(editingIndex, item);
    },

    async deleteItem(item) {
      if (await this.$refs.confirm.open(
        'Brisanje biljne vrste',
        `Jeste li sigurni da želite izbrisati uporabni dio "${item.croatianName}" ?`,
      )) {
        this.deleteUsefulPart({
          plantSpeciesId: this.$route.params.id,
          usefulPartId: item.id,
        });
      }
    },
  },

};
</script>

<style>

</style>
