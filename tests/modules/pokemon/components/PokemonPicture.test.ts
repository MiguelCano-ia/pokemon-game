import PokemonPicture from "@/modules/pokemon/components/PokemonPicture.vue";
import { mount } from "@vue/test-utils";

describe(' <PokemonPicture />', () => {
  const pokemonId = "1";
  test('should render the hidden image when the prop showImage is false', () => {
    const wrapper = mount(PokemonPicture, {
      props: {
        pokemonId: pokemonId,
        showImage: false,
      },
    });
    const img = wrapper.find('img');
    console.log(img.attributes()); // Ver los atributos de la imagen
    //const imageSource = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg';

    //expect(img.attributes('src')).toBe(imageSource);
    const attributes = img.attributes();
    expect(attributes).toEqual(
      expect.objectContaining({ // Comprueba si el objeto contiene las propiedades dadas
        'data-v-49cc19b7': '',
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
        alt: 'pokemon',
        class: 'brightness-0 h-[200px]'
      }),
    );
  });

  test('should render the image when the prop showImage is true', () => {
    const wrapper = mount(PokemonPicture, {
      props: {
        pokemonId: pokemonId,
        showImage: true,
      },
    });
    const img = wrapper.find('img');
    const attributes = img.attributes();
    expect(attributes).toEqual(
      expect.objectContaining({
        'data-v-49cc19b7': '',
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
        alt: 'pokemon',
        class: 'brightness-0 h-[200px]'
      }),
    );
  });
});