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
  page: number;
  size: number;
  name: string;
  id: string;
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

      return this._getFinalUrl('characters');
    }),
    concatMap((finalUrl: string) => {
      finalUrl = `${finalUrl}&offset=${this._config.size * this._config.page}&nameStartsWith=${this._config.name}`;
      finalUrl = `${finalUrl}&limit=${this._config.size}`;

      return this._http.get(finalUrl);
    }),
    map((marvelResult: any) => {
      const lastPage = Math.ceil(marvelResult.data.total / marvelResult.data.limit) - 1;

      return new tableActions.GetPageSuccess(lastPage, this._config.page, this._config.size, marvelResult.data.results);
    }),
    catchError((err: any) => {
      return Observable.throw(new tableActions.SetError(err));
    })
  );

  @Effect()
  getPageDetails$: Observable<Action> = this._actions$.ofType(tableActions.GET_PAGE_DETAILS)
  .pipe(
    concatMap((action: tableActions.GetPageDetails) => {
      this._config.page = action.page;
      this._config.size = action.size;
      this._config.id = action.id;

      return this._getFinalUrl(action.typeData);
    }),
    concatMap((finalUrl: string) => {
      finalUrl = finalUrl.replace(/#id#/g, this._config.id);
      finalUrl = `${finalUrl}&offset=${this._config.size * this._config.page}&limit=${this._config.size}`;

      return this._http.get(finalUrl);
    }),
    map((marvelResult: any) => {
      const lastPage = Math.ceil(marvelResult.data.total / marvelResult.data.limit) - 1;

      return new tableActions.GetPageSuccess(lastPage, this._config.page, this._config.size, marvelResult.data.results);
    })
  );

  constructor(
    @Inject(API_CONFIG_URL) private _endPoints: Observable<ApiUrls>,
    private _marvelAuth: MarvelKeyService,
    private _store: Store<AppState>,
    private _http: HttpClient,
    private _actions$: Actions
  ) { }

  public loadPage (page: number, size: number, name: string): Observable<Table> {

    this._store.dispatch(new tableActions.GetPage(page, size, name));
    return this.table$;
  }

  public loadPageDetails (id: string, typeData: 'comics' | 'series', page: number, size: number): Observable<Table> {
    this._store.dispatch(new tableActions.GetPageDetails(id, typeData, page, size));
    return this.table$;
  }

  private _getFinalUrl(url: string): Observable<string> {
    let authMarvel: MarvelAuth;

    return this._marvelAuth.getMarvelAuth()
    .pipe(
      concatMap((marvelAuth: MarvelAuth) => {
        authMarvel = marvelAuth;

        return this._endPoints;
      }),
      map((apiUrls: ApiUrls) => `${apiUrls[url]}?hash=${authMarvel.hash}&ts=${authMarvel.ts}&apikey=${authMarvel.apikey}`)
    );
  }
}
