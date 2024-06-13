import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Taseron } from '../models/taseron.model';

@Injectable({
  providedIn: 'root'
})
export class TaseronService {
  endPoint: string = "partner/taserons/";
  constructor(
    private http: HttpClient
  ) { }

  getTaserons(): Observable<Taseron[]> {
    return this.http.get<Taseron[]>(`${env.baseUrl}${env.apiV1}${this.endPoint}`);
  }

  getTaseron(id: string): Observable<Taseron> {
    return this.http.get<Taseron>(`${env.baseUrl}${env.apiV1}${this.endPoint}${id}/`);
  }

  createTaseron(taseron: Taseron): Observable<Taseron> {
    return this.http.post<Taseron>(`${env.baseUrl}${env.apiV1}${this.endPoint}`, taseron);
  }

  updateTaseron(id: string, taseron: Taseron): Observable<Taseron> {
    return this.http.put<Taseron>(`${env.baseUrl}${env.apiV1}${this.endPoint}${id}/`, taseron);
  }

  deleteTaseron(id: string): Observable<any> {
    return this.http.delete(`${env.baseUrl}${env.apiV1}${this.endPoint}${id}/`);
  }
}
