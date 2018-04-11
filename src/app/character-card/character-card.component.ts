import { Component, Output, EventEmitter } from '@angular/core';

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

  @Output()
  public eventLoading: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _store: CharacterCardService) {
    this._store.cardCharacter$.subscribe(
      (card: Card) => {
        if (card.id) {
          this.eventLoading.emit(card.loading);
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
