import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarvelCharacter } from '../entities/marvel-character';
import { CharacterCardService } from '../character-card/character-card.service';
import { Card } from '../character-card/character-card.entity';
import { TableConfig } from '../table/table-config.entites';
import { TableService } from '../table/table.service';

@Component({
  selector: 'ngrx-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {

  public detailsTitle = 'Details of your character';
  public hero: MarvelCharacter;

  public tableConfig: TableConfig = {
    defaultSize: 10,
    columsConfig: [{
      name: 'Name',
      key: 'name'
    }, {
      name: 'Description',
      key: 'description'
    }, {
      name: 'Date',
      key: 'date'
    }],
    lengthDescription: 55,
    showSize: false
  };

  private _idCharacter: string;

  constructor (
    private _activatedRote: ActivatedRoute,
    private _cardCharacter: CharacterCardService,
    private _tableService: TableService
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

    this._tableService.loadPage(0, 5, 'comics', {id: this._idCharacter});
    this._tableService.loadPage(0, 5, 'series', {id: this._idCharacter});
  }

  public changePageComics(pageData: {page: number, size: number}) {
    this._tableService.loadPage(pageData.page, pageData.size, 'comics', {id: this._idCharacter});
  }

  public changePageSeries(pageData: {page: number, size: number}) {
    this._tableService.loadPage(pageData.page, pageData.size, 'series', {id: this._idCharacter});
  }
}
