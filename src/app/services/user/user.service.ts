import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../config/config-service.service';
import { AddUserRequest, User, UsersResponse } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.usersEndpoint;

  constructor(private httpClient: HttpClient, private configService: ConfigService) {}

  getAll(): Observable<UsersResponse> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.configService.getToken()
    });

    return this.httpClient.get<UsersResponse>(this.apiUrl + '/get', { headers });
  }

  addUser(user: AddUserRequest): Observable<any> {
      
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.configService.getToken()
      });

      return this.httpClient.post<any>(this.apiUrl + '/create-user', user, { headers, observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          // Extract the status code from the HTTP response
          return response.status;
        }),
        catchError(error => {
          // Handle errors here if needed
          console.error('Error:', error);
          throw error;
        })
      );
    }

    deleteUser(email: string): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.configService.getToken()
      });

      return this.httpClient.delete<any>(this.apiUrl + '/delete/' + email, { headers, observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          // Extract the status code from the HTTP response
          return response.status;
        }),
        catchError(error => {
          // Handle errors here if needed
          console.error('Error:', error);
          throw error;
        })
      );
    }
}
