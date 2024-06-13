import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Agency } from '../models/agency.model';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  endPoint: string = "partner/agencies/"

  constructor(
    private http: HttpClient,
  ) { }

  getAgencies(): Observable<Agency[]> {
    return this.http.get<Agency[]>(`${env.baseUrl}${env.apiV1}${this.endPoint}`);
  }

  getAgency(id: string): Observable<Agency> {
    return this.http.get<Agency>(`${env.baseUrl}${env.apiV1}${this.endPoint}${id}/`);
  }

  createAgency(agency: Agency): Observable<Agency> {
    return this.http.post<Agency>(`${env.baseUrl}${env.apiV1}${this.endPoint}`, agency);
  }

  updateAgency(id: string, agency: Agency): Observable<Agency> {
    return this.http.put<Agency>(`${env.baseUrl}${env.apiV1}${this.endPoint}${id}/`, agency);
  }

  deleteAgency(id: string): Observable<any> {
    return this.http.delete(`${env.baseUrl}${env.apiV1}${this.endPoint}${id}/`);
  }
}
