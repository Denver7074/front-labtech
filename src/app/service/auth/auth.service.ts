// import {inject, Injectable} from '@angular/core';
// import {HttpClient, HttpErrorResponse} from "@angular/common/http";
// import {catchError, Observable, tap, throwError} from "rxjs";
// import {CookieService} from "ngx-cookie-service";
// import {Router} from "@angular/router";
// import {ErrorResponse} from '../../data/response.interface';
// import {
//   AccountRequest,
//   UserLoginRequest,
//   ResetPasswordRequest, UserRegisterRequest, AuthInterface, UpdatePasswordRequest
// } from '../../common-ui/auth/auth.interface';
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//
//   http = inject(HttpClient);
//   cookieService = inject(CookieService);
//   router = inject(Router);
//   accessToken: string | null = null;
//   refreshToken: string | null = null;
//   // apiUrl: string = 'https://testlabtech.ilabtech.tech';
//   apiUrl: string = 'http://192.168.0.205:8080';
//
//   saveToken(res: AuthInterface) {
//     this.accessToken = res.accessToken
//     this.refreshToken = res.refreshToken
//     this.cookieService.set('accessToken', res.accessToken)
//     this.cookieService.set('refreshToken', res.refreshToken)
//   }
//
//   isAuth(): boolean {
//     if (!this.accessToken) {
//       this.accessToken = this.cookieService.get("accessToken")
//     }
//     return !!this.accessToken
//   }
//
//   getToken(): string | null {
//     if (!this.accessToken) {
//       this.accessToken = this.cookieService.get("accessToken")
//     }
//     return this.accessToken
//   }
//
//     login(payload: UserLoginRequest) {
//     return this.http.post<AuthInterface>(
//       `${this.apiUrl}/auth-service/api/v1/login`,
//       payload)
//       .pipe(
//         tap(val => {
//           this.saveToken(val);
//         }),
//         catchError((error: HttpErrorResponse) => {
//           return throwError(() => this.handleError(error));
//         })
//       )
//   }
//
//   updatePassword(payload: UpdatePasswordRequest) {
//     return this.http.post<AuthInterface>(
//       `${this.apiUrl}/auth-service/api/v1/update-password`,
//       payload)
//       .pipe(
//         catchError((error: HttpErrorResponse) => {
//           return throwError(() => this.handleError(error));
//         })
//       )
//   }
//
//   refreshAuthToken() {
//     return this.http.get<AuthInterface>(
//       `${this.apiUrl}/auth-service/api/v1/refresh`
//     ).pipe(
//       tap(res => this.saveToken(res)),
//       catchError(err => {
//         this.logout()
//         return throwError(err)
//       })
//     )
//   }
//
//   signUp(payload: UserRegisterRequest): Observable<void | ErrorResponse> {
//     return this.http.post<void>(
//       `${this.apiUrl}/auth-service/api/v1/register`,
//       payload
//     ).pipe(
//       catchError((error: HttpErrorResponse) => {
//         return throwError(() => this.handleError(error));
//       })
//     );
//   }
//
//   forgot(payload: AccountRequest): Observable<void | ErrorResponse> {
//     return this.http.post<void>(
//       `${this.apiUrl}/auth-service/api/v1/forgot-password`,
//       payload
//     ).pipe(
//       catchError((error: HttpErrorResponse) => {
//         return throwError(() => this.handleError(error));
//       })
//     );
//   }
//
//   reset(payload: ResetPasswordRequest, forgotId: String): Observable<void | ErrorResponse> {
//     return this.http.post<void>(
//       `${this.apiUrl}/auth-service/api/v1/reset/${forgotId}`,
//       payload
//     ).pipe(
//       catchError((error: HttpErrorResponse) => {
//         return throwError(() => this.handleError(error));
//       })
//     );
//   }
//
//   confirmation(activateId: String): Observable<void | ErrorResponse> {
//     return this.http.post<void>(
//       `${this.apiUrl}/auth-service/api/v1/confirm/${activateId}`,
//       null
//     ).pipe(
//       catchError((error: HttpErrorResponse) => {
//         return throwError(() => this.handleError(error));
//       })
//     );
//   }
//
//   logout() {
//     this.cookieService.deleteAll();
//     this.accessToken = null;
//     this.refreshToken = null;
//
//     if (this.router.url !== '') {
//       this.router.navigate(['']);
//     }
//   }
//
//   private handleError(error: HttpErrorResponse): ErrorResponse {
//     return {
//       message: error.error.error?.message ?? 'Неизвестная ошибка',
//       code: error.error.error?.code ?? "Unknown",
//     };
//   }
//
// }
