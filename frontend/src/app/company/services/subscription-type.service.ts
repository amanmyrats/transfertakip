import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubscriptionType } from '../models/subscription-type.model';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionTypeService {
  endPoint: string = "company/subscriptiontypes/";

  constructor(
    private http: HttpClient,
  ) {

  }

  getSubscriptionTypes(): Observable<SubscriptionType[]> {
    return this.http.get<SubscriptionType[]>(`${env.baseUrl}${env.apiV1}${this.endPoint}`);
  }

  getSubscriptionType(id: string): Observable<SubscriptionType> {
    return this.http.get<SubscriptionType>(`${env.baseUrl}${env.apiV1}${this.endPoint}${id}/`);
  }

  createSubscriptionType(subscriptionType: SubscriptionType): Observable<SubscriptionType> {
    return this.http.post<SubscriptionType>(`${env.baseUrl}${env.apiV1}${this.endPoint}`, subscriptionType);
  }

  updateSubscriptionType(subscriptionType: SubscriptionType): Observable<SubscriptionType> {
    return this.http.put<SubscriptionType>(`${env.baseUrl}${env.apiV1}${this.endPoint}${subscriptionType.id}/`, subscriptionType);
  }

  deleteSubscriptionType(id: string): Observable<any> {
    return this.http.delete(`${env.baseUrl}${env.apiV1}${this.endPoint}${id}/`);
  }
  
}
