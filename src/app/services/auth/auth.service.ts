import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.authEndpoint;

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.httpClient.post<any>(this.apiUrl + '/login', body, { headers });
  }
}
