import { usePokemonGame } from '@pokemon/composables/usePokemonGame'
import { withSetup } from '../../../utils/with-setup'
import { GameStatus } from '@pokemon/interfaces'
import { flushPromises } from '@vue/test-utils'
import MockAdapter from 'axios-mock-adapter'
import { pokemonApi } from '@pokemon/api/pokemonApi'
import { pokemonListFake } from '../../../data/fake-pokemons'
import confetti from 'canvas-confetti'

const mockPokemonApi = new MockAdapter(pokemonApi); // Intercepta las solicitudes de pokemonApi

// Intercepta las solicitudes GET a la url y responde con un estada de 200 y un objeto que contiene results.
mockPokemonApi.onGet('/?limit=151').reply(200, {
  results: pokemonListFake,
});

vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

describe('usePokemonGame', () => {
  test('should initialize with the correct default values when its onMonted', async () => {
    const [results, app] = withSetup(usePokemonGame);
    console.log(results);

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.isLoading.value).toBe(true);
    expect(results.pokemonOptions.value).toEqual([]);
    expect(results.randomPokemon.value).toBe(undefined);

    await new Promise (resolve => setTimeout(resolve, 1000)); // Espera 1 segundo
    await flushPromises(); // Espera a que se resuelva la promesa

    expect(results.isLoading.value).toBe(false); // isLoading debería ser false cuando ya trajo los pokemons
    expect(results.pokemonOptions.value.length).toBe(4); // Debería tener 4 opciones de pokemons
    expect(results.randomPokemon.value).not.toBe(undefined); // Debería tener un pokemon random
  });

  test('should correctly handle getNextOptions', async () => {
    const [results] = withSetup(usePokemonGame);

    await flushPromises();

    results.gameStatus.value = GameStatus.Won;

    // Estimulo

    await results.getNextOptions(5);

    expect(results.gameStatus.value).toBe(GameStatus.Playing);
    expect(results.pokemonOptions.value).toHaveLength(5);
  });

  test('should correctly handle getNextOptions and return different pokemons', async () => {
    const [results] = withSetup(usePokemonGame)
    await flushPromises();

    // Estimulo

    await results.getNextOptions();
    const firstOptions = results.pokemonOptions.value; // Obtiene las primeras opciones de pokemons

    await results.getNextOptions();
    const secondOptions = results.pokemonOptions.value; // Obtiene las segundas opciones de pokemons

    expect(firstOptions).not.toEqual(secondOptions); // Las primeras opciones no deberían ser iguales a las segundas opciones
  });

  test('should correctly handle a incorrect answer', async () => {
    const [results] = withSetup(usePokemonGame);
    await new Promise (resolve => setTimeout(resolve, 1000));
    await flushPromises();

    const { checkAnswer, gameStatus } = results;
    checkAnswer("100000"); // Responde con el id incorrecto
    expect(gameStatus.value).toBe(GameStatus.Lost); // Debería haber perdido
  });

  test('should correctly handle a correct answer', async () => {
    const [results] = withSetup(usePokemonGame);
    await new Promise (resolve => setTimeout(resolve, 1000));
    await flushPromises();

    const { checkAnswer, gameStatus, randomPokemon } = results;
    checkAnswer(randomPokemon.value.id); // Responde con el id correcto

    expect( confetti ).toHaveBeenCalledWith({ // Debería haber llamado a confetti con los siguientes parámetros
      particleCount: 300,
      spread: 150,
      origin: { y: 0.6 }
    });
    expect(gameStatus.value).toBe(GameStatus.Won); // Debería haber ganado
  });
});