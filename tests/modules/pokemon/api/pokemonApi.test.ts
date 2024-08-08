import { pokemonApi } from '@pokemon/api/pokemonApi'

describe('pokemonApi', () => {
  it('pokeAPi url', () => {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
    expect(baseUrl).toBe(pokemonApi.defaults.baseURL); // El valor de la URL base de la API de Pokemon debe ser igual a la URL base de la API de Pokemon en la configuración de la API de Pokemon.
  });
});