import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MarvelKeyService } from './marvel-key.service';
import * as keyConfiguration from './key.config';
import * as urlConfiguration from './url.config';

@NgModule({
  imports: [ HttpClientModule ],
  providers: [
    { provide: keyConfiguration.MARVEL_CONFIG_KEYS, useFactory: keyConfiguration.marvelKeysFactory, deps: [ HttpClient ] },
    { provide: urlConfiguration.API_CONFIG_URL, useFactory: urlConfiguration.apiUrlsFactory, deps: [ HttpClient ] },
    MarvelKeyService
  ],
})
export class CoreModule {

  constructor (@SkipSelf() @Optional() private parent: CoreModule) {
    if (parent) {
      throw new Error('Core module should be injected only once');
    }
  }
}
