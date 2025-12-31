import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, finalize, map, Observable, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {
  AccountRequest,
  ResetPasswordRequest, Session,
  UpdatePasswordRequest, UserLoginRequest, UserRegisterRequest
} from '../../data/auth.interface';
import {ApiResponse, AuthInterface, ErrorResponse} from '../../data/response.interface';
import {CookieService} from 'ngx-cookie-service';
import {AsyncPipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private router = inject(Router);

  saveToken(res: ApiResponse<AuthInterface>) {
    const accessToken = res.value.accessToken ?? '';
    const refreshToken = res.value.refreshToken ?? '';
    this.cookieService.set('accessToken', accessToken, 0, '/');
    this.cookieService.set('refreshToken', refreshToken, 0, '/')
  }

  isAuth(): boolean {
    return !!this.cookieService.get("accessToken");
  }

  getToken(): string {
    return this.cookieService.get("accessToken");
  }

  getRefreshToken(): string {
    return this.cookieService.get("refreshToken");
  }

  login(payload: UserLoginRequest): Observable<AuthInterface> {
    return this.http.post<ApiResponse<AuthInterface>>(
      `/auth-service/api/v1/login`,
      payload)
      .pipe(
        map(val => {
          if (val.error) {
            throw val.error;
          }
          this.saveToken(val);
          return val.value
        }),
        catchError(err => throwError(() => err))
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

  updateEmail(payload: AccountRequest) {
    return this.http.post<void>(
      `/auth-service/api/v1/update-email`,
      payload)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => this.handleError(error));
        })
      )
  }

  refreshAuthToken() {
    const requestBody: AuthInterface = {
      accessToken: this.cookieService.get('accessToken'),
      refreshToken: this.cookieService.get('refreshToken'),
    }
    return this.http.post<ApiResponse<AuthInterface>>(
      `/auth-service/api/v1/refresh`,
      requestBody
    ).pipe(
      map(val => {
        if (val.error) {
          throw val.error;
        }
        this.saveToken(val);
        return val
      }),
      catchError(err => throwError(() => err))
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
    const requestBody: AuthInterface = {
      refreshToken: this.cookieService.get("refreshToken"),
      accessToken: this.cookieService.get("accessToken")
    };

    return this.http.post<void>(
      `/auth-service/api/v1/logout`,
      requestBody
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        // Логируем ошибку, но не прерываем цепочку (чтобы finalize выполнился)
        this.handleError(error);
        return []; // или EMPTY, если не нужен результат
      }),
      finalize(() => {
        this.cookieService.delete('accessToken');
        this.cookieService.delete('refreshToken');
      })
    );
  }

  logoutAll() {
    const requestBody: AuthInterface = {
      refreshToken: this.cookieService.get("refreshToken"),
      accessToken: this.cookieService.get("accessToken")
    };

    return this.http.post<void>(
      `/auth-service/api/v1/logout-all`,
      requestBody
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return [];
      }),
      finalize(() => {
        this.cookieService.delete('accessToken');
        this.cookieService.delete('refreshToken');
      })
    );
  }

  getAllSessions(): Observable<Session[]> {
    return this.http.get<ApiResponse<Session[]>>('/auth-service/api/v1/active-sessions').pipe(
      map(val => {
        if (val.error) {
          throw val.error;
        }
        return val.value
      }),
      catchError(err => throwError(() => err))
    )
  }

  deleteSession(sessionId: string) {
    return this.http.delete(`/auth-service/api/v1/delete-session/${sessionId}`);
  }

  private handleError(error: HttpErrorResponse): ErrorResponse {
    return {
      message: error.error.error?.message ?? 'Неизвестная ошибка',
      code: error.error.error?.code ?? "Unknown",
    };
  }

}
