import { TypePokemon } from "../services/pokeapiservice.service";

export interface Pokemon {
    id: number;
    name: string;
    sprite: string;
    type: TypePokemon;
  }