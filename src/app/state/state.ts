import { TableState } from '../table';
import { Card } from '../character-card';

export interface AppState {
  table: TableState;
  card: Card;
}
