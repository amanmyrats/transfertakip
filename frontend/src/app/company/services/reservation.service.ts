import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';

@Injectable({
  providedIn: 'root', 
})
export class ReservationService {
  endPoint: string = "company/reservations/"
  constructor(
    private http: HttpClient
  ) { 
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${env.baseUrl}${env.apiV1}${this.endPoint}`);
  }

  getReservation(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${env.baseUrl}${env.apiV1}${this.endPoint}${id}/`);
  }

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${env.baseUrl}${env.apiV1}${this.endPoint}`, reservation);
  }

  updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${env.baseUrl}${env.apiV1}${this.endPoint}${reservation.id}/`, reservation);
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${env.baseUrl}${env.apiV1}${this.endPoint}${id}/`);
  }

  getTransferTypeChoices(){
    return [
      { value: 'ARR', label: 'Arrival' },
      { value: 'DEP', label: 'Departure' },
      { value: 'ARA', label: 'Ara Transfer' },
      { value: 'TUR', label: 'Tur' },
    ];
  }


}
