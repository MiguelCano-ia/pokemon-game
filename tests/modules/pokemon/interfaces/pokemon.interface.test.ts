import type { Pokemon } from '@pokemon/interfaces'

describe('Pokemon interface', () => {
  const pokemon: Pokemon = { id: '1', name: 'bulbasaur'};

  test('should have an id', () => {
    expect(pokemon.id).toEqual(expect.any(String));
  });

  test('should have a name', () => {
    expect(pokemon.name).toEqual(expect.any(String));
  });

});