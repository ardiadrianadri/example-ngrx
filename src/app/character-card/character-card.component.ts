import { Component } from '@angular/core';

import { CharacterCardService } from './character-card.service';
import { MarvelCharacter } from '../entities/marvel-character';
import { Card } from './character-card.entity';

@Component({
  selector: 'ngrx-card-character',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.css']
})
export class CardCharacterComponent {
  public marvelCharacter: MarvelCharacter;
  public loading = false;

  constructor(private _store: CharacterCardService) {
    this._store.cardCharacter$.subscribe(
      (card: Card) => {
        if (card.id) {
          this.loading = card.loading;
          this.marvelCharacter = {
            id: card.id,
            name: card.name,
            description: card.description,
            photo: card.photo,
            date: card.date
          };
        }
      },
      (err: any) => {
        throw new Error(err);
      }
    );
  }
}
