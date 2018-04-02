import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'search-heroes' },
  { path: 'search-heroes', loadChildren: './search/search.module#SearchModule'},
  { path: 'details-hero/:character', loadChildren: './details/details.module#DetailsModule'}
];
