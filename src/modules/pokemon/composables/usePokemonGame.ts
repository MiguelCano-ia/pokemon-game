import { computed, onMounted, ref } from 'vue'
import { GameStatus, type Pokemon, type PokemonListResponse } from '@/modules/pokemon/interfaces'
import { pokemonApi } from '@/modules/pokemon/api/pokemonApi'
import confetti from 'canvas-confetti';

export const usePokemonGame = () => {
  const gameStatus = ref<GameStatus>( GameStatus.Playing );

  const pokemons = ref<Pokemon[]>([]) // Array de pokemons
  const pokemonOptions = ref<Pokemon[]>([]); // Array de opciones de pokemons

  const isLoading = computed(() => pokemons.value.length === 0); // Indica si se están cargando los pokemons

  // Obtiene un pokemon aleatorio de las opciones
  const randomPokemon = computed(() => {
    const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length);
    return pokemonOptions.value[randomIndex]
  });

  const getPokemons = async (): Promise<Pokemon[]> => {
    const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');

    const pokemonsArray = response.data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/'); // Divide la url por el caracter '/'
      const id = urlParts[urlParts.length - 2]; // Obtiene el penúltimo elemento del array
      return {
        name: pokemon.name,
        id: id,
      };
    });

    return pokemonsArray.sort(() => Math.random() - 0.5); // Aleatoriza el orden de los pokemons
  };

  const getNextOptions = ( howMany: number = 4) => { // Obtiene las siguientes opciones de pokemons
    gameStatus.value = GameStatus.Playing;
    pokemonOptions.value = pokemons.value.slice(0, howMany); // Obtiene los primeros 'howMany' pokemons
    pokemons.value = pokemons.value.slice(howMany); // Elimina los primeros 'howMany' pokemons
  };

  const checkAnswer = (id: string) => {
    const hasWon = randomPokemon.value.id === id;

    if (hasWon) {
      gameStatus.value = GameStatus.Won;
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 }
      });
      return;
    }
    gameStatus.value = GameStatus.Lost;
  }

  onMounted(async () => {
    await new Promise((r) => setTimeout(r, 500)); // Probar el isLoading
    pokemons.value = await getPokemons(); // Carga los pokemons
    getNextOptions(); // Carga las opciones de pokemons
  });

  return {
    gameStatus,
    isLoading,
    pokemonOptions,
    randomPokemon,

    // Methods
    getNextOptions,
    checkAnswer,
  }
};