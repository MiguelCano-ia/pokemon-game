import { mount } from '@vue/test-utils'
import PokemonGame from '@pokemon/pages/PokemonGame.vue'
import { usePokemonGame } from '@pokemon/composables/usePokemonGame'
import { GameStatus } from '@pokemon/interfaces'
import { expect, type Mock, vi } from 'vitest'

vi.mock('@pokemon/composables/usePokemonGame', () => ({
  usePokemonGame: vi.fn(),
}));

const pokemonsOptions = [
  {
    name: "bulbasaur",
    id: "1"
  },
  {
    name: "ivysaur",
    id: "2"
  },
  {
    name: "venusaur",
    id: "3"
  },
  {
    name: "charmander",
    id: "4"
  },
];


describe('<PokemonGame />', () => {
  test('should initialize with default values', () => {
    (usePokemonGame as Mock).mockReturnValue({
      gameStatus: GameStatus.Playing,
      isLoading: true,
      randomPokemon: undefined,
      pokemonOptions: [],
      victories: 0,
      defeats: 0,
      getNextOptions: vi.fn(),
      resetScore: undefined,
      checkAnswer: vi.fn(),
    });

    const wrapper = mount(PokemonGame);
    console.log(wrapper.html());

    expect(wrapper.get('h1').text()).toBe('Wait please');
    expect(wrapper.get('h1').classes()).toEqual(['text-3xl'])

    expect(wrapper.get('h3').text()).toBe('Loading Pokemons');
    expect(wrapper.get('h3').classes()).toEqual(['animate-pulse'])
  });

  test('should render PokemonPicture and PokemonOptions', () => {
    (usePokemonGame as Mock).mockReturnValue({
      gameStatus: GameStatus.Playing,
      isLoading: false,
      randomPokemon: pokemonsOptions.at(0),
      pokemonOptions: pokemonsOptions,
      victories: 0,
      defeats: 0,
      getNextOptions: vi.fn(),
      resetScore: undefined,
      checkAnswer: vi.fn(),
    });

    const wrapper = mount(PokemonGame);
    const pokemons = pokemonsOptions.map(p => p.name);
    const urlImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg';

    expect(wrapper.find('img').attributes('src')).toBe(urlImage);

    const buttons = wrapper.findAll('.capitalize.disabled\\:shadow-none.disabled\\:bg-gray-100'); // "\\" es para escapar los :
    expect(buttons).length(4);

    buttons.forEach(button => {
      expect(pokemons).toContain(button.text());
    })
  });

  test('should render button for a new game', () => {
    (usePokemonGame as Mock).mockReturnValue({
      gameStatus: GameStatus.Won,
      isLoading: false,
      randomPokemon: pokemonsOptions.at(0),
      pokemonOptions: pokemonsOptions,
      victories: 0,
      defeats: 0,
      getNextOptions: vi.fn(),
      resetScore: undefined,
      checkAnswer: vi.fn(),
    });

    const wrapper = mount(PokemonGame);
    const button = wrapper.find('[data-test-id="btn-new-game"]');
    expect(button.text()).toBe('Play Again');
  });

  test('should call the getNextOptions function when the button is clicled', async () => {
    (usePokemonGame as Mock).mockReturnValue({
      gameStatus: GameStatus.Won,
      isLoading: false,
      randomPokemon: pokemonsOptions.at(0),
      pokemonOptions: pokemonsOptions,
      victories: 0,
      defeats: 0,
      getNextOptions: vi.fn(),
      resetScore: undefined,
      checkAnswer: vi.fn(),
    });

    const { getNextOptions } = usePokemonGame();

    const wrapper = mount(PokemonGame);
    const button = wrapper.find('[data-test-id="btn-new-game"]');

    await button.trigger('click');

    expect( getNextOptions ).toHaveBeenCalledWith(4);
  });
});