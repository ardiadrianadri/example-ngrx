import { Injectable, Inject} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Md5 } from 'ts-md5/dist/md5';

import { MARVEL_CONFIG_KEYS } from './key.config';
import { MarvelAuth } from '../entities/marvel-auth.entity';
import { MarvelKeys } from '../entities/keys.entity';

@Injectable()
export class MarvelKeyService {

  constructor(@Inject(MARVEL_CONFIG_KEYS) private authConfig: Observable<MarvelKeys>) { }

  private createAuthObject ( keys: MarvelKeys): MarvelAuth {
    const ts = new Date().getTime().toString();
    const apiKey = keys.marvelPublicKey;
    const md5: Md5 = new Md5();

    let result: MarvelAuth;
    let hash = '';

    md5.appendStr(ts);
    md5.appendStr(keys.marvelPrivateKey);
    md5.appendStr(keys.marvelPublicKey);

    hash = md5.end().toString();
    result = {
      ts: ts,
      apikey: apiKey,
      hash: hash
    };

    return result;
  }

  public getMarvelAuth(): Observable<MarvelAuth> {
    return this.authConfig
    .pipe(
      map (this.createAuthObject)
    );
  }
}
