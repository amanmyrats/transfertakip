import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';
import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = env.baseUrl;
  private refreshInProgress = false;
  private endPoint = 'auth/'

  constructor(
    private http: HttpClient, 
    
  ) { }

  // private accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.baseUrl}${this.endPoint}api/token/`, { username, password })
      .pipe(
        map(response => {
          if (response && response.access) {
            localStorage.setItem('accessToken', response.access);
            localStorage.setItem('refreshToken', response.refresh);
            // this.accessTokenSubject.next(response.access);
            return true;
          }
          return false;
        })
      );
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      return this.http.post<any>(`${this.baseUrl}${this.endPoint}api/token/refresh/`, { refresh: refreshToken })
        .pipe(
          map(response => {
            if (response && response.access) {
              localStorage.setItem('accessToken', response.access);
              // this.accessTokenSubject.next(response.access);
            }
            return response;
          }),
          catchError(error => {
            this.logout();
            throw error;
          })
        );
    } else {
      this.logout();
      return new Observable(observer => observer.error('No refresh token found'));
    }
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // this.accessTokenSubject.next('');
  }

  public get currentAccessToken(): string | null {
    return localStorage.getItem('accessToken');
    // Access the current value using getValue()
    // return this.accessTokenSubject.getValue();
  }

  // public get accessTokenChanges(): Observable<string> {
  //   return this.accessTokenSubject.asObservable();
  // }

  isLoggedIn(): boolean {
    return !!this.currentAccessToken;
  }

  changePassword(oldPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${this.endPoint}changepassword/`, 
      { old_password: oldPassword, new_password: newPassword, confirm_password: confirmPassword});
  }
}
