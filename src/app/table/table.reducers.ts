import { AppState } from '../state/state';
import * as tableActions from './table.actions';
import { Table } from './table.entities';
import { MarvelCharacter } from '../entities/marvel-character';

export type Action = tableActions.ALL;

export namespace TableQuery {
  export const getTable = (state: AppState) => state.table;
}

export const intialState: Table = {
  pageSize: 5,
  lastPage: 0,
  actualPage: 0,
  loading: false,
  rows: [],
  err: ''
};

export function TableReducer (state: Table = intialState, action: Action): Table {
  const result: Table = {... state};

  switch (action.type) {
    case tableActions.GET_PAGE:
      result.loading = true;
      break;

    case tableActions.GET_PAGE_SUCCESS:
      action = (action as tableActions.GetPageSuccess);
      result.lastPage = action.lastPage;
      result.actualPage = action.actualPage;
      result.pageSize = action.size;
      result.err = null;
      result.loading = false;
      result.rows = action.payload.map((marvelResult) => {
        const marvelCharacter: MarvelCharacter = {
          id: marvelResult.id,
          name: marvelResult.name,
          description: marvelResult.description,
          date: new Date(marvelResult.modified),
          photo: `${marvelResult.thumbnail.path}.${marvelResult.thumbnail.extension}`
        };

        return marvelCharacter;
      });
      break;

    case tableActions.SET_ERROR_TABLE:
      action = (action  as tableActions.SetError);
      result.loading = false;
      result.err = action.err;
      break;
  }

  return result;
}
