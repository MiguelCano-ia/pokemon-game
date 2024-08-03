<template>
  <section class="mt-5 flex flex-col">
    <!-- Aquí se emite el evento selectPokemon con el id del pokemon seleccionado y se muestra cada nombre del pokemon-->
    <button
      v-for="{ name, id } in pokemonOptions"
      :key="id"
      :class="['capitalize disabled:shadow-none disabled:bg-gray-100', {
        correct: id === correctAnswer && blockSelection,
        incorrect: id !== correctAnswer && blockSelection,
      }]"
      @click="$emit('selectPokemon', id)"
      :disabled=blockSelection
    >
      {{ name }}
    </button>
  </section>
</template>

<script lang="ts" setup>
  import type { Pokemon } from '@/modules/pokemon/interfaces'

  interface Props {
    pokemonOptions: Pokemon[]; // Se define el prop pokemonOptions que es un array de objetos de tipo Pokemon
    blockSelection: boolean; // Se define el prop blockSelection que es un booleano
    correctAnswer: string; // Se define el prop correctAnswer que es un strin
  }

  defineProps<Props>();

  defineEmits<{
    selectPokemon: [id: string]; // Se define el evento selectPokemon que emite el id del pokemon seleccionado
  }>();

</script>

<style scoped>
  button {
   @apply bg-white shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
  }

  .correct {
    @apply bg-blue-500 text-white hover:bg-blue-600;
  }

  .incorrect {
    @apply bg-red-100 opacity-70 hover:bg-red-200;
  }
</style>