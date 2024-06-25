import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';
import { Role } from '../models/role.model';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  endpoint = 'accounts/roles/';

  constructor(
    private http: HttpClient,
  ) { }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${env.baseUrl}${env.apiV1}${this.endpoint}`);
  }

  getRole(id: string): Observable<Role> { 
    return this.http.get<Role>(`${env.baseUrl}${env.apiV1}${this.endpoint}${id}/`);
  }

  createRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${env.baseUrl}${env.apiV1}${this.endpoint}`, role);
  }

  updateRole(id: string, role: Role): Observable<Role> {
    return this.http.put<Role>(`${env.baseUrl}${env.apiV1}${this.endpoint}${id}/`, role);
  }

  deleteRole(id: string): Observable<any> {
    return this.http.delete(`${env.baseUrl}${env.apiV1}${this.endpoint}${id}/`);
  }

}
