import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { concatMap, map, catchError } from 'rxjs/operators';


import { MarvelKeyService } from '../core/marvel-key.service';
import { API_CONFIG_URL } from '../core/url.config';
import { ApiUrls } from '../entities/urls.entity';
import * as CardActions from './character-card.actions';
import { CardQuery } from './character-card.reducer';
import { AppState } from '../state/state';
import { MarvelAuth } from '../entities/marvel-auth.entity';
import { MarvelCharacter } from '../entities/marvel-character';
import { Card } from './character-card.entity';

type Action = CardActions.ALL;

interface Config {
  marvelAuth: MarvelAuth;
  id: string;
}

@Injectable()
export class CharacterCardService {

  private _config: Partial<Config> = {};
  public cardCharacter$ = this._store.select(CardQuery.getCard);

  @Effect()
  public getCharacter$: Observable<Action> = this._actions$.ofType(CardActions.GET_CHARACTER_INFO)
  .pipe(
    concatMap((action: CardActions.GetCharacterInfo) => {
      this._config.id = action.id;

      return this._marvelAuth.getMarvelAuth();
    }),
    concatMap((auth: MarvelAuth) => {
      this._config.marvelAuth = auth;

      return this._apiUrls$;
    }),
    concatMap((apiUrls: ApiUrls) => {
      let finalUrl = apiUrls['singleCharacter'].replace(/#id#/g, this._config.id);
      finalUrl = `${finalUrl}?hash=${this._config.marvelAuth.hash}&apikey=${this._config.marvelAuth.apikey}`;
      finalUrl = `${finalUrl}&ts=${this._config.marvelAuth.ts}`;

      return this._http.get(finalUrl);
    }),
    map((marvelAnswer: any) => {
      const marvelCharacter: MarvelCharacter = {
        id: marvelAnswer.data.results[0].id,
        name: marvelAnswer.data.results[0].name,
        description: marvelAnswer.data.results[0].description,
        photo: `${marvelAnswer.data.results[0].thumbnail.path}.${marvelAnswer.data.results[0].thumbnail.extension}`,
        date: new Date(marvelAnswer.data.results[0].modified)
      };

      return new CardActions.GetCharacterSuccess(marvelCharacter);
    }),
    catchError(err => Observable.throw(new CardActions.SetCharacterError(err)))
  );

  constructor(
    private _store: Store<AppState>,
    private _http: HttpClient,
    private _marvelAuth: MarvelKeyService,
    @Inject(API_CONFIG_URL) private _apiUrls$: Observable<ApiUrls>,
    private _actions$: Actions
  ) { }

  public getCharacterInfo (id: string): Observable<Card> {
    this._store.dispatch(new CardActions.GetCharacterInfo(id));

    return this.cardCharacter$;
  }
}
