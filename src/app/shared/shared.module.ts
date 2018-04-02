import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TitleComponent } from './title.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

import { DatePipe } from './date.pipe';


const sharedModules = [
  CommonModule,
  FormsModule,
  MatButtonModule
];
const sharedComponents = [
  TitleComponent,
  DatePipe
];

@NgModule({
  imports: [
    ...sharedModules,
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
