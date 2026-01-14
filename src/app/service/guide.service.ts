import {inject, Injectable} from '@angular/core';

import {catchError, map, Observable, shareReplay, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ApiResponse, ResponseType} from '../data/response.interface';

@Injectable({
  providedIn: 'root'
})
export class GuideService {
  private http = inject(HttpClient);
  public types = new Map<string, Observable<ResponseType[]>>();

  public getTypes(path: string): Observable<ResponseType[]> {
    let observable = this.types.get(path);
    if (!observable) {
      observable = this.createRequest(path)
      this.types.set(path, observable);
    }
    return observable;
  }

  public refresh(path: string): Observable<ResponseType[]> {
    this.types.delete(path);
    let observable = this.createRequest(path)
    this.types.set(path, observable);
    return observable;
  }

  private createRequest(path: string) {
   return this.http
      .get<ApiResponse<ResponseType[]>>(`guide-service/api/v1/${path}/all`)
      .pipe(
        map(response => {
          if (response.error) {
            throw response.error;
          }
          return response.value;
        }),
        catchError(err => throwError(() => err)),
        shareReplay(1)
      );
  }
}
