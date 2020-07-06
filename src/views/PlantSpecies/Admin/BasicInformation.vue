<template>
  <plant-species-information></plant-species-information>
</template>

<script>
const PlantSpeciesInformation = () => import('@/components/PlantSpecies/Information.vue');

export default {
  name: 'AdminBasicInformation',

  components: {
    PlantSpeciesInformation,
  },
};
</script>

<style>

</style>
