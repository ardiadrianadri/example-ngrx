import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelCharacter } from '../entities/marvel-character';
import { CharacterCardService } from '../character-card/character-card.service';
import { Card } from '../character-card/character-card.entity';

@Component({
  selector: 'ngrx-details',
  templateUrl: './details.component.html'
})

export class DetailsComponent implements OnInit {

  public detailsTitle = 'Details of your character';
  public hero: MarvelCharacter;
  public loading = false;

  private _idCharacter: string;

  constructor (
    private _activatedRote: ActivatedRoute,
    private _cardCharacter: CharacterCardService
  ) {
    this._idCharacter = this._activatedRote.snapshot.params.id;
  }

  ngOnInit () {
    this._cardCharacter.getCharacterInfo(this._idCharacter);
    this._cardCharacter.cardCharacter$.subscribe(
      (data: Card) => {
        if (data.name) {
          this.detailsTitle = 'Details of your character';
          this.detailsTitle = this.detailsTitle.replace(/your character/g, data.name);
        }
      },
      (err: any) => { throw new Error(err); }
    );
  }
}
