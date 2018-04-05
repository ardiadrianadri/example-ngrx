import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TitleComponent } from './title.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

import { DatePipe } from './date.pipe';
import { SpinnerComponent } from './spinner.component';
import { CardComponent } from './card.component';


const sharedModules = [
  CommonModule,
  FormsModule,
  MatButtonModule
];
const sharedComponents = [
  TitleComponent,
  DatePipe,
  SpinnerComponent,
  CardComponent
];

@NgModule({
  imports: [
    ...sharedModules,
    MatProgressSpinnerModule,
    MatToolbarModule
  ],
  declarations: [
    ...sharedComponents
  ],
  exports: [
    ...sharedModules,
    ...sharedComponents
  ],
  providers: [],
})
export class SharedModule { }
