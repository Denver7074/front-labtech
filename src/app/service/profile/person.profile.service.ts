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

  // getMyGeneralInformation(personId: string | null): Observable<PersonInfo> {
    // if (!personId) {
    //   return throwError(() => new Error('Person ID is required'));
    // }
    //
    // return this.http.get<ApiResponse<PersonInfo>>(
    //   `/profile-service/api/v1/persons/${personId}/general`
    // ).pipe(
    //   map(response => {
    //     if (response.error) {
    //       throw response.error;
    //     }
    //     return response.value;
    //   }),
    //   catchError(err => throwError(() => err))
    // );
  // }

  getMyGeneralInformation(personId: string | null): PersonInfo {
    // Можно игнорировать personId — всегда возвращаем одни и те же данные
    const mockData: PersonInfo = {
      firstName: "Наталья",
      middleName: "Игоревна",
      lastName: "Голубева",
      snils: "82435795100",
      birthPlace: "Волгоград",
      birthDate: "1994-06-08",
      contacts: [
        {
          contactTypeId: "22222222-2222-2222-2222-222222222222",
          userId: "6c173763-2116-4879-9a43-826453df7fb8",
          value: "наталья.голубева@example.com"
        }
      ],
      educations: [
        {
          organizationName: "Российский экономический университет",
          userId: "6c173763-2116-4879-9a43-826453df7fb8",
          startDate: "2013-02-17",
          endDate: "2015-07-16",
          specialization: "Магистр по направлению Экономика",
          documentNumber: "ДП885186",
          documentIssueDate: "2016-10-30",
          educationTypeId: "f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1"
        }
      ],
      works: []
    };

    return mockData;
  }


}
