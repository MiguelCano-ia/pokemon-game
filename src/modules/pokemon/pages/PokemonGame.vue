<template>
  <section v-if="isLoading" class="flex flex-col justify-center items-center w-screen h-screen">
    <h1 class="text-3xl">Wait please</h1>
    <h3 class="animate-pulse">Loading Pokemons</h3>
  </section>

  <section v-else class="flex flex-col justify-center items-center min-h-screen w-screen">
    <h1 class="m-5 text-2xl">Who's this Pokemon?</h1>
    <div class="h-20">
      <button
        class="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition-all"
        data-test-id="btn-new-game"
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
    <div class="flex gap-5 mt-10">
      <h2 class="text-xl">Victories
        <h3 class="ml-2 text-center">{{ victories }}</h3>
      </h2>
      <h2 class="text-xl">Defeats
        <h3 class="ml-2 text-center">{{ defeats }}</h3>
      </h2>
    </div>
    <button @click="resetScore" class="bg-blue-500 text-white p-3 rounded-lg shadow-md hover:bg-blue-600 transition-all mt-5">
      Reset Score
    </button>
  </section>
</template>

<script lang="ts" setup>
  import PokemonPicture from '@/modules/pokemon/components/PokemonPicture.vue'
  import PokemonOptions from '@/modules/pokemon/components/PokemonOptions.vue'
  import { usePokemonGame } from '@/modules/pokemon/composables/usePokemonGame'
  import { GameStatus } from '@/modules/pokemon/interfaces'

  const { gameStatus, isLoading, randomPokemon, pokemonOptions, victories, defeats, getNextOptions, resetScore, checkAnswer } = usePokemonGame();
</script>