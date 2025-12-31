import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {HhInstitution, HhPosition, HhSuggestResponse} from '../data/hh.interface';

@Injectable({
  providedIn: 'root'
})
export class HhService {
  http = inject(HttpClient);
  private baseUrl = 'https://api.hh.ru/suggests/educational_institutions';


  suggestInstitutions(query: string): Observable<HhSuggestResponse<HhInstitution>> {
    const url = `https://api.hh.ru/suggests/educational_institutions?text=${encodeURIComponent(query)}`;
    return this.http.get<HhSuggestResponse<HhInstitution>>(url);
  }

  suggestPositions(query: string): Observable<HhSuggestResponse<HhPosition>> {
    const url = `https://api.hh.ru/suggests/positions?text=${encodeURIComponent(query)}`;
    return this.http.get<HhSuggestResponse<HhPosition>>(url);
  }

}
