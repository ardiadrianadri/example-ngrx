import { NgModule } from '@angular/core';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { SharedModule } from '../shared/shared.module';

import { CardCharacterComponent } from './character-card.component';

@NgModule({
  imports: [
    SharedModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CardCharacterComponent
  ],
  declarations: [
    CardCharacterComponent
  ]
})
export class CardCharacterModule { }
