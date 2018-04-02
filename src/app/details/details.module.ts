import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { detailsRoutes } from './details.router';
import { DetailsComponent } from './details.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(detailsRoutes)
  ],
  declarations: [DetailsComponent],
  providers: [],
})
export class DetailsModule { }
