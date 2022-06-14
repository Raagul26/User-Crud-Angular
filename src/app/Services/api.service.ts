import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private getToken(): HttpHeaders {
    const token = new HttpHeaders({
      Authorization: localStorage.getItem('token') + '',
    });
    return token;
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/users`, {
      headers: this.getToken()
    });
  } 

  getUser(userId: string): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/users/${userId}`, {
      headers: this.getToken()
    });
  }

  createUser(body: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/user`, body, {
      headers: this.getToken()
    });
  }

  updateUser(userId: string, body: any): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}/user/${userId}`, body, {
      headers: this.getToken()
    });
  }

  deleteUser(userId: string):Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/user/${userId}`, {
      headers: this.getToken()
    });
  }

  registerAdmin(body: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}admin/signup`, body);
  }

  loginAdmin(body: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}admin/login`, body);
  }
}
