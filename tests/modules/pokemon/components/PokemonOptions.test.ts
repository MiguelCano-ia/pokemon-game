import PokemonOptions from '@pokemon/components/PokemonOptions.vue'
import { mount } from '@vue/test-utils'

const options = [
  { id: "1", name: "Bulbasaur" },
  { id: "2", name: "Ivysaur" },
  { id: "3", name: "Venusaur" },
];

describe('<PokemonOptions />', () => {
  test('should render button with correct text', () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        pokemonOptions: options,
        blockSelection: false,
        correctAnswer: "1",
      },
    });
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(options.length);

    buttons.forEach((button, index) => { // Recorre cada botón
      expect(button.text()).toBe(options[index].name); // Comprueba si el texto del botón es igual al nombre del Pokemon
    });
  });

  test('should emit selectPokemon event when a button is clicked', async () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        pokemonOptions: options,
        blockSelection: false,
        correctAnswer: "1",
      },
    });
    const [b1, b2, b3, b4] = wrapper.findAll('button');
    await b1.trigger('click'); // Simula un click en el botón
    await b2.trigger('click');
    await b3.trigger('click');

    console.log(wrapper.emitted('selectPokemon')); // Muestra los eventos emitidos
    expect(wrapper.emitted().selectPokemon[0]).toEqual(["1"]); // Comprueba si el evento emitido es igual al Pokemon correcto
  });

  test('should block the selection when blockSelection is true', async () => {
    const wrapper = mount(PokemonOptions, {
      props: {
        pokemonOptions: options,
        blockSelection: true,
        correctAnswer: "1",
      },
    });
    const buttons = wrapper.findAll('button');
    buttons.forEach((button) => {
      const attributes = Object.keys(button.attributes());
      expect(attributes).toContain('disabled'); // Comprueba si el botón está deshabilitado
    });

    const [b1, b2, b3, b4] = wrapper.findAll('button');
    await b1.trigger('click');
    await b2.trigger('click');
    await b3.trigger('click');

    expect(wrapper.emitted('selectPokemon')).toBeUndefined(); // Comprueba si no se ha emitido ningún evento
  });

  test('should apply correct styling to buttons based on correct/incorret answers', () => {
    const correctAnswer = "2";
    const wrapper = mount(PokemonOptions, {
      props: {
        pokemonOptions: options,
        blockSelection: true,
        correctAnswer: correctAnswer,
      },
    });

    const buttons = wrapper.findAll('button');
    buttons.forEach((button, index) => {
      if (options[index].id === correctAnswer) {
        expect(button.classes()).toContain('correct'); // Comprueba si el botón es correcto
      }  else {
        expect(button.classes()).toContain('incorrect'); // Comprueba si el botón es incorrecto
      }
    });
  });
});