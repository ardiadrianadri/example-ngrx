import { AppState } from '../state/state';
import * as tableActions from './table.actions';
import { TableState, Table } from './table.entities';
import { MarvelElement } from '../entities/marvel-element.entity';

export type Action = tableActions.ALL;

export namespace TableQuery {
  export const getTable = (state: AppState) => state.table;
}

export const initialState: Table = {
  pageSize: 5,
  lastPage: 0,
  actualPage: 0,
  loading: false,
  rows: [],
  err: ''
};

export function TableReducer (state: TableState = {}, action: Action): TableState {
  const result: TableState = {... state};
  const dataType = (action.dataType) ? action.dataType : 'default';

  if (!result[action.dataType]) {
    result[dataType] = {...initialState};
  }

  switch (action.type) {
    case tableActions.GET_PAGE:
      result[dataType].loading = true;
      break;

    case tableActions.GET_PAGE_SUCCESS:
      action = (action as tableActions.GetPageSuccess);
      result[dataType].lastPage = action.lastPage;
      result[dataType].actualPage = action.actualPage;
      result[dataType].pageSize = action.size;
      result[dataType].err = null;
      result[dataType].loading = false;
      result[dataType].rows = action.payload.map((marvelResult) => {
        const marvelElement: MarvelElement = {
          id: marvelResult.id,
          name: marvelResult.name,
          description: marvelResult.description,
          date: new Date(marvelResult.modified)
        };

        return marvelElement;
      });
      break;

    case tableActions.SET_ERROR_TABLE:
      action = (action  as tableActions.SetError);
      result[dataType].loading = false;
      result[dataType].err = action.err;
      break;

    case tableActions.GET_PAGE_DETAILS:
      result[dataType].loading = true;
      break;
  }

  return result;
}
