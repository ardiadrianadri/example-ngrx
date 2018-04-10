import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';


import { Observable } from 'rxjs/Observable';
import { concatMap, map, catchError, bufferCount } from 'rxjs/operators';
import 'rxjs/add/observable/from';

import { AppState } from '../state/state';
import { TableQuery } from './table.reducers';
import { MarvelKeyService } from '../core/marvel-key.service';
import { API_CONFIG_URL } from '../core/url.config';
import { MarvelAuth } from '../entities/marvel-auth.entity';
import { ApiUrls } from '../entities/urls.entity';
import * as tableActions from './table.actions';
import { Table, TableState, DataType, Payload } from './table.entities';

type Action = tableActions.ALL;

@Injectable()
export class TableService {

  private _table$ = this._store.select(TableQuery.getTable);

  @Effect()
  getPages$: Observable<Action> = this._actions$.ofType(tableActions.GET_PAGE)
  .pipe(
    concatMap((action: tableActions.GetPage) => {
      return this._marvelAuth.getMarvelAuth();
    }, (action: tableActions.GetPage, marvelAuth: MarvelAuth) => [action, marvelAuth]),
    concatMap((value: [tableActions.GetPage, MarvelAuth]) => {
      return this._endPoints;
    }, (values: [tableActions.GetPage, MarvelAuth], apiUrls: ApiUrls) => {
      const finalUrl = apiUrls[values[0].dataType];
      return [...values, finalUrl];
    }),
    concatMap((value: [tableActions.GetPage, MarvelAuth, string]) => {
      let finalUrl = value[2];
      finalUrl = `${finalUrl}?ts=${value[1].ts}&hash=${value[1].hash}&apikey=${value[1].apikey}`;
      finalUrl = `${finalUrl}&offset=${value[0].size * value[0].page}&limit=${value[0].size}`;

      if (value[0].dataType === 'characters') {
        finalUrl = `${finalUrl}&nameStartsWith=${value[0].payload.name}`;
      } else {
        finalUrl = finalUrl.replace(/#id#/g, value[0].payload.id);
      }

      return this._http.get(finalUrl);
    }, (values: [tableActions.GetPage, MarvelAuth, string], marvelResult: any) => [values[0], marvelResult]),
    map((value: [tableActions.GetPage, any]) => {
      const lastPage = Math.ceil(value[1].data.total / value[1].data.limit) - 1;
      return new tableActions.GetPageSuccess(lastPage, value[0].page, value[0].size, value[0].dataType, value[1].data.results);
    })
  );

  /*@Effect()
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
  );*/

  constructor(
    @Inject(API_CONFIG_URL) private _endPoints: Observable<ApiUrls>,
    private _marvelAuth: MarvelKeyService,
    private _store: Store<AppState>,
    private _http: HttpClient,
    private _actions$: Actions
  ) { }

  public loadPage (page: number, size: number, dataType: DataType, payload: Payload): Observable<Table> {

    this._store.dispatch(new tableActions.GetPage(page, size, dataType, payload));
    return this.getTable(dataType);
  }

  public getTable(type: DataType): Observable<Table> {
    return this._table$
    .pipe(
      map((tableState: TableState) => (tableState[type]) ? tableState[type] : tableState.default)
    );
  }
}
