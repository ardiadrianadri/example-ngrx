import { MarvelElement } from '../entities/marvel-element.entity';

export interface Table {
  lastPage?: number;
  actualPage?: number;
  pageSize?: number;
  rows?: MarvelElement [];
  err?: any;
  loading?: boolean;
}

export interface TableState {
  [key: string]: Table;
}

export type DataType = 'characters' | 'comics' | 'series' | 'default';

export interface Payload {
  name?: string;
  id?: string;
}
