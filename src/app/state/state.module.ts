import { NgModule, SkipSelf, Optional } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TableService, TableReducer } from '../table';
import { CharacterCardService, CardReducer } from '../character-card';

@NgModule({
  imports: [
    EffectsModule.forRoot([
      TableService,
      CharacterCardService
    ]),
    StoreModule.forRoot({
      table: TableReducer,
      card: CardReducer
    })
  ],
  providers: [
    TableService
  ]
})
export class StateModule {

  constructor( @SkipSelf() @Optional() private parent: StateModule) {
    if (parent) {
      throw new Error('The state module only can be injected once');
    }
  }
}
