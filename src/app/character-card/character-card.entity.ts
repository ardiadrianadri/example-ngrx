import { MarvelCharacter } from '../entities/marvel-character';

export interface Card extends MarvelCharacter {
  loading: boolean;
  err: string;
}
