import { InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { ApiUrls } from '../entities/urls.entity';

export const API_CONFIG_URL: InjectionToken<Observable<ApiUrls>> = new InjectionToken<Observable<ApiUrls>>('API_CONFIG_URL');

export function apiUrlsFactory (http: HttpClient): Observable<ApiUrls> {
  const url = '/assets/url-api.json';

  return (http.get(url) as Observable<ApiUrls>);
}
