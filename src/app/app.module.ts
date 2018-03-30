import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRoutes } from './app.router';
import { SearchModule } from './search/search.module';
import { CoreModule } from './core/core.module';
import { StateModule } from './state/state.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    SearchModule,
    CoreModule,
    StateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
