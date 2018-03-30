import { NgModule, SkipSelf, Optional } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { TableService, TableReducer } from '../table';

@NgModule({
  imports: [
    EffectsModule.forRoot([
      TableService
    ]),
    StoreModule.forRoot({
      table: TableReducer
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
