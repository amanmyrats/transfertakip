import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  endPoint: string = 'company/companies/'
  constructor(
    private http: HttpClient
  ) { }

 getCompanys(): Observable<Company[]> {
    return this.http.get<Company[]>(`${env.baseUrl}${env.apiV1}${this.endPoint}`);
  } 

  getCompany(id: string): Observable<Company> {
    return this.http.get<Company>(`${env.baseUrl}${env.apiV1}${this.endPoint}${id}/`);
  }

  createCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(`${env.baseUrl}${env.apiV1}${this.endPoint}`, company);
  }

  createTrialCompany(company: any): Observable<Company> {
    return this.http.post<Company>(`${env.baseUrl}${env.apiV1}'company/trial/create/'}`, company);
  }

  updateCompany(id: string, company: Company): Observable<Company> {
    return this.http.put<Company>(`${env.baseUrl}${env.apiV1}${this.endPoint}${id}/`, company);
  }

  deleteCompany(id: string): Observable<any> {
    return this.http.delete(`${env.baseUrl}${env.apiV1}${this.endPoint}${id}/`);
  }

}
