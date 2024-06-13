import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Driver } from '../models/driver.model';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  endPoint: string = "company/drivers/";
  constructor(
    private http: HttpClient
  ) { }

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${env.baseUrl}${env.apiV1}${this.endPoint}`);
  }

  getDriver(id: string): Observable<Driver> {
    return this.http.get<Driver>(`${env.baseUrl}${env.apiV1}${this.endPoint}${id}/`);
  }

  createDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(`${env.baseUrl}${env.apiV1}${this.endPoint}`, driver);
  }

  updateDriver(id: string, driver: Driver): Observable<Driver> {
    return this.http.put<Driver>(`${env.baseUrl}${env.apiV1}${this.endPoint}${id}/`, driver);
  }

  deleteDriver(id: string): Observable<any> {
    return this.http.delete(`${env.baseUrl}${env.apiV1}${this.endPoint}${id}/`);
  }
}
