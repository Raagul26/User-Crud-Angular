import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/users`);
  } 

  getUser(userId: string): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/users/${userId}`);
  }

  createUser(body: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/user`, body);
  }

  updateUser(userId: string, body: any): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}/user/${userId}`, body);
  }

  deleteUser(userId: string):Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/user/${userId}`);
  }

  registerAdmin(body: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}admin/signup`, body);
  }

  loginAdmin(body: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}admin/login`, body);
  }
}
