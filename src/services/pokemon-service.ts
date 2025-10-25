import type { Pokemon, PokemonListResponse } from "@/types/pokemon-types";
import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export const pokemonApi = {
  // Fetch a paginated list of Pokemon
  async getPokemonList(
    limit: number = 50,
    offset: number = 0
  ): Promise<PokemonListResponse> {
    const response = await axios.get(
      `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch Pokemon list");
    }
    return response.data;
  },

  // Fetch detailed data for a specific Pokemon by name or ID
  async getPokemon(nameOrId: string | number): Promise<Pokemon> {
    const response = await axios.get(`${BASE_URL}/pokemon/${nameOrId}`);
    if (response.status !== 200) {
      throw new Error(`Failed to fetch Pokemon: ${nameOrId}`);
    }
    return response.data;
  },

  // Fetch the image URL for a specific Pokemon by name or ID
  async getPokemonImageUrl(nameOrId: string | number): Promise<string> {
    const response = await axios.get(`${BASE_URL}/pokemon/${nameOrId}`);
    if (response.status !== 200) {
      throw new Error(`Failed to fetch Pokemon: ${nameOrId}`);
    }
    const pokemon: Pokemon = response.data;
    return (
      pokemon.sprites.other?.["official-artwork"]?.front_default ||
      pokemon.sprites.front_default
    );
  },
};
