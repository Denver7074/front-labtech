import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {catchError, switchMap, throwError} from "rxjs";

let isRefreshing = false;

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const token = authService.getToken()
  if(!token) return next(req)
  if (isRefreshing) {
    return refreshAndProceed(authService, req, next)
  }
  req = addNewToken(req, token)
  return next(req).pipe(
    catchError(err => {
      if (err.status == 403) {
        return refreshAndProceed(authService, req, next)
      }
      return throwError(err)
    })
  )
}

const refreshAndProceed = (authService: AuthService, req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  if (isRefreshing) {
    return next(addNewToken(req, authService.accessToken()!))
  }
  isRefreshing = true
  return authService.refreshAuthToken()
    .pipe(
      switchMap(token => {
        isRefreshing = false
        return next(addNewToken(req, token.accessToken))
      })
    )
}

const addNewToken = (req: HttpRequest<unknown>, accessToken: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}


