import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { detailsRoutes } from './details.router';
import { DetailsComponent } from './details.component';
import { CardCharacterModule } from '../character-card/character-card.module';
import { TableModule } from '../table/table.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(detailsRoutes),
    CardCharacterModule,
    TableModule
  ],
  declarations: [DetailsComponent],
  providers: [],
})
export class DetailsModule { }
