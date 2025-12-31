import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideLuxonDateAdapter} from '@angular/material-luxon-adapter';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authTokenInterceptor} from './service/auth/auth.interceptor';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {RussianPaginatorIntl} from './components/ui/russian-paginator-intl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideLuxonDateAdapter(),
    provideHttpClient(withInterceptors([authTokenInterceptor])),
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: LOCALE_ID, useValue: 'ru' },
    { provide: MatPaginatorIntl, useClass: RussianPaginatorIntl },
  ]
};
