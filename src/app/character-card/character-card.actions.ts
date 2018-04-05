import { Action } from '@ngrx/store';
import { MarvelCharacter } from '../entities/marvel-character';

export const GET_CHARACTER_INFO = '[CHARACTER CARD] get info';
export const GET_CHARACTER_SUCCESS = '[CHARACTER CARD] get info success';
export const SET_CHARACTER_ERROR = '[CHARACTER CARD] set error message';

export class GetCharacterInfo implements Action {
  readonly type = GET_CHARACTER_INFO;

  constructor (public id: string) {}
}

export class GetCharacterSuccess implements Action {
  readonly type = GET_CHARACTER_SUCCESS;

  constructor (public character: MarvelCharacter) {}
}

export class SetCharacterError implements Action {
  readonly type = SET_CHARACTER_ERROR;

  constructor (public err: any) {}
}



export type ALL = GetCharacterInfo | GetCharacterSuccess | SetCharacterError;

