<template>
  <v-data-table
    :headers="headers"
    :items="subspecies"
    :footer-props="{
      'items-per-page-text': 'Broj stavki po stranici'
    }"
    flat
  >
    <template v-slot:top v-if="showForm">
      <div class="mb-5">
        <useful-part-form ref="form"></useful-part-form>
        <confirm-dialog ref="confirm"></confirm-dialog>
      </div>
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
    <template v-slot:no-data>
      <span>Biljna vrsta nema dodijeljenih podvrsta</span>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions } from 'vuex';
import UsefulPartForm from '@/components/Subspecies/SubspeciesForm.vue';
import ConfirmDialog from '@/components/general/ConfirmDialog.vue';

export default {
  name: 'SubspeciesTable',

  components: {
    UsefulPartForm,
    ConfirmDialog,
  },

  props: {
    showForm: {
      type: Boolean,
      default: true,
    },
    subspecies: {
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
