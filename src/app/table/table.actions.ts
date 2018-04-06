
import { Action } from '@ngrx/store';

export const GET_PAGE = '[TABLE] Get page';
export const GET_PAGE_SUCCESS = '[TABLE] Get page success';
export const SET_ERROR_TABLE = '[TABLE] Set error';
export const GET_PAGE_DETAILS = '[TABLE] Get page details';

export class GetPage implements Action {
  readonly type = GET_PAGE;

  constructor (public page: number, public size: number, public name: string) {}
}

export class GetPageSuccess implements Action {
  readonly type = GET_PAGE_SUCCESS;

  constructor (
    public lastPage: number,
    public actualPage: number,
    public size: number,
    public payload: any[]
  ) {}
}

export class SetError  implements Action {
  readonly type = SET_ERROR_TABLE;

  constructor (public err: any) {}
}

export class GetPageDetails implements Action {
  readonly type = GET_PAGE_DETAILS;

  constructor (
    public id: string,
    public typeData: 'comics' | 'series',
    public page: number,
    public size: number
  ) {}
}


export type ALL = GetPage | GetPageSuccess | SetError | GetPageDetails;
