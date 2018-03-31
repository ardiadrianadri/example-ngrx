import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule
  ],
  exports: [
    TableComponent
  ],
  declarations: [
    TableComponent
  ]
})
export class TableModule { }
