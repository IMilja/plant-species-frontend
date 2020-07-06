<template>
  <div class="text-left">
    <plant-species-information></plant-species-information>
  </div>
</template>

<script>
const PlantSpeciesInformation = () => import('@/components/PlantSpecies/Information.vue');

export default {
  name: 'SearchBasicInformation',

  components: {
    PlantSpeciesInformation,
  },
};
</script>

<style>

</style>
