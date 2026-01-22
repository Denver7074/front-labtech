import {inject, Injectable} from '@angular/core';
import {catchError, map, Observable, shareReplay, throwError} from 'rxjs';
import {ApiResponse} from '../data/response.interface';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  protected http = inject(HttpClient);

  post<TResponse>(requestBody: any, path: string) {
    return this.http.post<ApiResponse<TResponse>>(
      path,
      requestBody
    ).pipe(
      map(response => {
        if (response.error) {
          throw response.error;
        }
        return response.value;
      }),
      catchError(err => throwError(() => err))
    );
  }

  put<TResponse>(result: string, path: string): Observable<TResponse> {
    return this.http.put<ApiResponse<TResponse>>(path, result)
      .pipe(
        map(response => {
          if (response.error) {
            throw response.error;
          }
          return response.value;
        }),
        catchError(err => throwError(() => err))
      );
  }

  get<TResponse>(path: string, filter?: Map<string, string | string[]>): Observable<TResponse> {
    let params = new HttpParams();

    if (filter) {
      for (const [key, value] of filter.entries()) {
        if (value != null) {
          params = params.append(key, value.toString());
        }
      }
    }
    return this.http.get<ApiResponse<TResponse>>(path, {params})
      .pipe(
        map((response: ApiResponse<TResponse>) => {
          if (response.error) {
            throw response.error;
          }
          return response.value;
        }),
        catchError(err => throwError(() => err)),
        shareReplay(1),
      );
  }

  getEntities<TResponse>(path: string, page: number | 0, size: number | 10, filter?: Record<string, any>) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'id,desc');

    if (filter) {
      Object.keys(filter).forEach(key => {
        const value = filter[key];
        if (value != null) {
          params = params.append(`${key}`, value.toString());
        }
      });
    }

    return this.http.get<ApiResponse<TResponse[]>>(
      path,
      {params}
    ).pipe(
      map(response => {
        if (response.error) {
          throw response.error;
        }
        return response;
      }),
      catchError(err => throwError(() => err))
    );
  }

  delete(path: string) {
    return this.http.delete<void>(path);
  }
}
