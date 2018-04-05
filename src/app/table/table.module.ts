import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import { SharedModule } from '../shared/shared.module';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  imports: [
    MatSelectModule,
    SharedModule
  ],
  exports: [
    TableComponent
  ],
  declarations: [
    TableComponent
  ]
})
export class TableModule { }
