import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokeapiserviceService {

  private readonly baseUrl = "https://pokeapi.co/api/v2/";

  constructor(
    private http : HttpClient
  ) { }
  

  /**
   * Obtiene listado de pokemons segun el tipo
   *
   * @param {TypePokemon} type
   * @return {*}
   * @memberof PokeapiserviceService
   */
  getTypePokemons(type: TypePokemon){
    return this.http.get<any>(this.baseUrl + `type/${type}`).pipe(map( x =>  {
      let res = x.pokemon.map((x:any) => {
        let str = x.pokemon.url;
        let idx = str.indexOf('pokemon/') + 8;
        str = str.slice(idx);
        let id = str.slice(0, -1);
        return { id : id , name : x.pokemon.name }
      });
      return res as {id:number, name:string} [];
    }));
  }

  getFirePokemons(){
    return this.getTypePokemons(TypePokemon.Fire);
  }
  getElectricPokemons(){
    return this.getTypePokemons(TypePokemon.Electric);
  }
  getRockPokemons(){
    return this.getTypePokemons(TypePokemon.Rock);
  }
  getWaterPokemons(){
    return this.getTypePokemons(TypePokemon.Water);
  }


  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.baseUrl}pokemon/${id}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        return {
          id: response.id,
          name: response.name,
          sprite: response.sprites.front_default,
          type: response.types[0].type.name as TypePokemon,
        };
      })
    );
  }

  getPokemonImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

}

export enum TypePokemon {
  Fire = 10,
  Electric = 13,
  Rock = 6,
  Water = 11
}
