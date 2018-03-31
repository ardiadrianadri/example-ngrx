import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  exports: [
    TableComponent
  ],
  declarations: [
    TableComponent
  ]
})
export class TableModule { }
