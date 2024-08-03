<template>
  <section v-if="isLoading" class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl">Espere por favor</h1>
    <h3 class="animate-pulse">Cargando Pokemons</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center h-screen w-screen">
    <h1 class="m-5">Who's this Pokemon?</h1>
    <div class="h-20">
      <button
        class="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition-all"
        v-if="gameStatus !== GameStatus.Playing"
        @click="getNextOptions(4)"
      >
        Play Again
      </button>
    </div>
    <PokemonPicture :pokemon-id="randomPokemon.id" :show-pokemon="gameStatus !== GameStatus.Playing" /> <!-- Aquí se pasa el prop showPokemon -->
    <PokemonOptions
      :pokemon-options="pokemonOptions"
      :block-selection="gameStatus !== GameStatus.Playing"
      @select-pokemon="checkAnswer"
      :correct-answer="randomPokemon.id"
    />
  </section>
</template>

<script lang="ts" setup>
  import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue'
  import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue'
  import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame'
  import { GameStatus } from '@/modules/pokemon/interfaces'

  const { gameStatus, isLoading, randomPokemon, pokemonOptions, getNextOptions, checkAnswer } = usePokemonGame();
</script>