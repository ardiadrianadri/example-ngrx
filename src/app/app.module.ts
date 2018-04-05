import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { appRoutes } from './app.router';
import { SearchModule } from './search/search.module';
import { CoreModule } from './core/core.module';
import { StateModule } from './state/state.module';
import { CardCharacterModule } from './character-card/character-card.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    SearchModule,
    CoreModule,
    StateModule,
    BrowserModule,
    BrowserAnimationsModule,
    CardCharacterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
