import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokeapiserviceService } from 'src/app/services/pokeapiservice.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @Input() pokemon: Pokemon | undefined;

  constructor(private pokeApiService: PokeapiserviceService) {}

  getPokemonImageUrl(): string {
    if (this.pokemon) {
      return this.pokeApiService.getPokemonImageUrl(this.pokemon.id);
    }
    return '';  
  }


}
