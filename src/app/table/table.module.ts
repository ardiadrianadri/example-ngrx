import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table';

import { TableComponent } from './table.component';

@NgModule({
  imports: [
    MatTableModule,
    CommonModule
  ],
  exports: [
    TableComponent
  ],
  declarations: [
    TableComponent
  ]
})
export class TableModule { }
