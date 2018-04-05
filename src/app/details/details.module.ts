import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { detailsRoutes } from './details.router';
import { DetailsComponent } from './details.component';
import { CardCharacterModule } from '../character-card/character-card.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(detailsRoutes),
    CardCharacterModule
  ],
  declarations: [DetailsComponent],
  providers: [],
})
export class DetailsModule { }
