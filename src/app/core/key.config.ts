import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { MarvelKeys } from '../entities/keys.entity';

export const MARVEL_CONFIG_KEYS: InjectionToken<Observable<MarvelKeys>> = new InjectionToken<Observable<MarvelKeys>>('MARVEL_CONFIG_KEYS');

export function marvelKeysFactory (http: HttpClient): Observable<MarvelKeys> {
  const url = '/assets/marvel-keys.json';

  return (http.get(url) as Observable<MarvelKeys>);
}
