<template>
  <v-data-table
    :headers="headers"
    :items="usefulParts"
    :expanded.sync="expanded"
    :footer-props="{
      'items-per-page-text': 'Broj stavki po stranici'
    }"
    show-expand
    class="elevation-1"
  >
    <template v-slot:top v-if="isAdmin">
      <div class="mb-5">
        <useful-part-form ref="form"></useful-part-form>
        <confirm-dialog ref="confirm"></confirm-dialog>
      </div>
    </template>
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
      <td :colspan="headers.length" class="pl-2 py-2 text-justify">{{ item.description }}</td>
    </template>
    <template v-slot:no-data>
      <span>Biljna vrsta nema dodijeljenih uporabnih dijelova</span>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions } from 'vuex';
import UsefulPartForm from '@/components/UsefulPart/UsefulPartForm.vue';
import ConfirmDialog from '@/components/general/ConfirmDialog.vue';

export default {
  name: 'UsefulPartTable',

  components: {
    UsefulPartForm,
    ConfirmDialog,
  },

  props: {
    isAdmin: {
      type: Boolean,
      default: true,
    },
    usefulParts: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Array,
      default: () => [
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
    },
  },

  data() {
    return {
      expanded: [],
    };
  },

  methods: {
    ...mapActions({
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
