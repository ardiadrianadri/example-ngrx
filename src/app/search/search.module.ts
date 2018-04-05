import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';

import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search.component';
import { searchRoutes } from './search.router';
import { FormSearchComponent } from './form-search.component';
import { TableModule } from '../table/table.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(searchRoutes),
    MatInputModule,
    TableModule
  ],
  exports: [],
  declarations: [
    SearchComponent,
    FormSearchComponent
  ],
  providers: [],
})
export class SearchModule { }
