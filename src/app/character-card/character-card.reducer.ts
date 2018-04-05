import * as cardActions from './character-card.actions';
import { AppState } from '../state/state';
import { Card } from './character-card.entity';


export type Action = cardActions.ALL;

export namespace CardQuery {
  export const getCard = (state: AppState) => state.card;
}

export const initialState: Card = {
  loading: false,
  err: '',
  id: undefined,
  name: undefined,
  description: undefined,
  photo: undefined,
  date: undefined
};

export function CardReducer (state: Card = initialState, action: Action) {
  const result: Card = {...state};

  switch (action.type) {
    case cardActions.GET_CHARACTER_INFO:
      result.loading = true;
      break;
    case cardActions.GET_CHARACTER_SUCCESS:
      result.loading = false;
      Object.keys(action.character).forEach((key: string) => {
        result[key] = action.character[key];
      });
      break;
    case cardActions.SET_CHARACTER_ERROR:
      result.loading = false;
      result.err = action.err;
  }

  return result;
}
