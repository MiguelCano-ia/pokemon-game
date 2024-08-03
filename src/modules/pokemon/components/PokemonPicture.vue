<template>
  <section>
    <img
      v-if="!showPokemon"
      :src=pokemonImage
      alt="pokemon"
      class="brightness-0 h-[200px]"
    >
    <img
      v-else
      :src=pokemonImage
      alt="pokemon"
      class="fade-in h-[200px]"
    >
  </section>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  interface Props {
    pokemonId: string;
    showPokemon?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    showPokemon: false,
  });

  const pokemonImage = computed(() => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`;
  });
</script>

<style scoped>
 /*Estilos para que el usuario no arrastre el fcking pokemon*/
  img {
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
  }
</style>