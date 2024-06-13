import { Injectable } from '@angular/core';
import { Currency } from '../models/currency.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  endPoint: string = "company/currencies/";
  constructor(
    private http: HttpClient
  ) { }

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(`${env.baseUrl}${env.apiV1}${this.endPoint}`);
  }

  getCurrency(id: string): Observable<Currency> {
    return this.http.get<Currency>(`${env.baseUrl}${env.apiV1}${this.endPoint}${id}/`);
  }

  createCurrency(currency: Currency): Observable<Currency> {
    return this.http.post<Currency>(`${env.baseUrl}${env.apiV1}${this.endPoint}`, currency);
  }

  updateCurrency(id: string, currency: Currency): Observable<Currency> {
    return this.http.put<Currency>(`${env.baseUrl}${env.apiV1}${this.endPoint}${id}/`, currency);
  }

  deleteCurrency(id: string): Observable<any> {
    return this.http.delete(`${env.baseUrl}${env.apiV1}${this.endPoint}${id}/`);
  }
  
}
