import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import {BehaviorSubject, catchError, filter, switchMap, take, throwError} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

let refreshSubject: BehaviorSubject<string | null> | null = null;

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = authService.getToken();
  if (!token) {
    return next(req);
  }

  req = addAuthHeader(req, token);
  return next(req).pipe(
    catchError(err => {
      if (err.status === 401 || err.status === 403) {
        return handleAuthError(authService, req, next);
      }
      return throwError(() => err);
    })
  );
};

function handleAuthError(
  authService: AuthService,
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  if (refreshSubject) {
    return refreshSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => next(addAuthHeader(req, token!)))
    );
  }

  refreshSubject = new BehaviorSubject<string | null>(null);
  return authService.refreshAuthToken().pipe(
    switchMap(authResponse => {
      const newAccessToken = authResponse.value.accessToken;
      refreshSubject!.next(newAccessToken);
      refreshSubject = null;

      return next(addAuthHeader(req, newAccessToken));
    }),
    catchError(error => {
      refreshSubject = null;
      authService.logout();
      return throwError(() => error);
    })
  );
}

function addAuthHeader(req: HttpRequest<unknown>, token: string | null): HttpRequest<unknown> {
  if (!token) {
    return req;
  }
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}
