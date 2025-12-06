import {inject, Injectable} from '@angular/core';

import {catchError, map, Observable, tap, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PersonInfo} from '../../data/profile.interface';
import {ApiResponse} from '../../data/response.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonGeneralService {
  http = inject(HttpClient);

  getMyGeneralInformation(personId: string | null): Observable<PersonInfo> {
    if (!personId) {
      return throwError(() => new Error('Person ID is required'));
    }

    return this.http.get<ApiResponse<PersonInfo>>(
      `/profile-service/api/v1/persons/${personId}/general`
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
}
