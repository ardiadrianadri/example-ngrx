import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';


import { Observable } from 'rxjs/Observable';
import { concatMap, map, catchError } from 'rxjs/operators';

import { AppState } from '../state/state';
import { TableQuery } from './table.reducers';
import { MarvelKeyService } from '../core/marvel-key.service';
import { API_CONFIG_URL } from '../core/url.config';
import { MarvelAuth } from '../entities/marvel-auth.entity';
import { ApiUrls } from '../entities/urls.entity';
import * as tableActions from './table.actions';
import { Table } from './table.entities';

type Action = tableActions.ALL;

interface Config {
  marvelAuth: MarvelAuth;
  endpoints: ApiUrls;
  page: number;
  size: number;
  name: string;
}

@Injectable()
export class TableService {

  private _config: Partial<Config> = {};

  public table$ = this._store.select(TableQuery.getTable);

  @Effect()
  getPage$: Observable<Action> = this._actions$.ofType(tableActions.GET_PAGE)
  .pipe(
    concatMap((action: tableActions.GetPage) => {
      this._config.page = action.page;
      this._config.size = action.size;
      this._config.name = action.name;

      return this._marvelAuth.getMarvelAuth();
    }),
    concatMap((marvelAuth: MarvelAuth) => {
      this._config.marvelAuth = marvelAuth;

      return this._endPoints;
    }),
    concatMap((endPoints: ApiUrls) => {
      this._config.endpoints = endPoints;
      let finalUrl = this._config.endpoints.characters;
      finalUrl = `${finalUrl}?hash=${this._config.marvelAuth.hash}&apikey=${this._config.marvelAuth.apikey}`;
      finalUrl = `${finalUrl}&ts=${this._config.marvelAuth.ts}&limit=${this._config.size}&offset=${this._config.size * this._config.page}`;
      finalUrl = `${finalUrl}&nameStartsWith=${this._config.name}`;

      return this._http.get(finalUrl);
    }),
    map((marvelResult: any) => {
      const lastPage = Math.floor(marvelResult.data.total / marvelResult.data.limit);

      return new tableActions.GetPageSuccess(lastPage, this._config.page, this._config.size, marvelResult.data.results);
    }),
    catchError((err: any) => {
      return Observable.throw(new tableActions.SetError(err));
    })
  );

  constructor(
    @Inject(API_CONFIG_URL) private _endPoints: Observable<ApiUrls>,
    private _marvelAuth: MarvelKeyService,
    private _store: Store<AppState>,
    private _http: HttpClient,
    private _actions$: Actions
  ) { }

  loadPage (page: number, size: number, name: string): Observable<Table> {

    this._store.dispatch(new tableActions.GetPage(page, size, name));
    return this.table$;
  }
}
