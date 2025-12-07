import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {
  AccountRequest,
  ResetPasswordRequest,
  UpdatePasswordRequest, UserLoginRequest, UserRegisterRequest
} from '../../data/auth.interface';
import {AuthInterface, ErrorResponse} from '../../data/response.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  cookieService = inject(CookieService);
  router = inject(Router);
  accessToken = signal('');
  refreshToken = signal('');
  // apiUrl: string = 'https://testlabtech.ilabtech.tech';

  saveToken(res: AuthInterface) {
    this.accessToken.set(res.accessToken);
    this.refreshToken.set(res.refreshToken);
    this.cookieService.set('accessToken', res.accessToken);
    this.cookieService.set('refreshToken', res.refreshToken);
  }

  isAuth(): boolean {
    if (!this.accessToken()) {
      this.accessToken.set(this.cookieService.get("accessToken"))
    }
    return !!this.accessToken()
  }

  getToken(): string | null {
    if (!this.accessToken()) {
      this.accessToken.set(this.cookieService.get("accessToken"))
    }
    return this.accessToken()
  }

  login(payload: UserLoginRequest): Observable<AuthInterface> {
    return this.http.post<AuthInterface>(
      `/auth-service/api/v1/login`,
      payload)
      .pipe(
        tap(val => {
          this.saveToken(val);
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => this.handleError(error));
        })
      )
  }

  updatePassword(payload: UpdatePasswordRequest) {
    return this.http.post<AuthInterface>(
      `/auth-service/api/v1/update-password`,
      payload)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => this.handleError(error));
        })
      )
  }

  refreshAuthToken() {
    return this.http.get<AuthInterface>(
      `/auth-service/api/v1/refresh`
    ).pipe(
      tap(res => this.saveToken(res)),
      catchError(err => {
        this.logout()
        return throwError(err)
      })
    )
  }

  registration(payload: UserRegisterRequest): Observable<void | ErrorResponse> {
    return this.http.post<void>(
      `/auth-service/api/v1/register`,
      payload
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.handleError(error));
      })
    );
  }

  forgot(payload: AccountRequest): Observable<void | ErrorResponse> {
    return this.http.post<void>(
      `/auth-service/api/v1/forgot-password`,
      payload
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.handleError(error));
      })
    );
  }

  reset(payload: ResetPasswordRequest, forgotId: String): Observable<void | ErrorResponse> {
    return this.http.post<void>(
      `/auth-service/api/v1/reset-password/${forgotId}`,
      payload
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.handleError(error));
      })
    );
  }

  confirmation(activateId: String): Observable<void | ErrorResponse> {
    return this.http.get<void>(
      `/auth-service/api/v1/confirm/${activateId}`
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.handleError(error));
      })
    );
  }

  logout() {
    this.cookieService.deleteAll();
    this.accessToken.set('');
    this.refreshToken.set('');

    if (this.router.url !== '') {
      this.router.navigate(['']);
    }
  }

  private handleError(error: HttpErrorResponse): ErrorResponse {
    return {
      message: error.error.error?.message ?? 'Неизвестная ошибка',
      code: error.error.error?.code ?? "Unknown",
    };
  }

}
