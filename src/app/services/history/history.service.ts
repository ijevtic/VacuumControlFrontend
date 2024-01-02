import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../config/config-service.service';
import { AddUserRequest, ErrorsResponse, User, UsersResponse } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiUrl = environment.historyEndpoint;

  constructor(private httpClient: HttpClient, private configService: ConfigService) {}

  getAll(): Observable<ErrorsResponse> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.configService.getToken()
    });

    return this.httpClient.get<ErrorsResponse>(this.apiUrl + '/get', { headers, observe: 'response' })
    .pipe(
      map((response: HttpResponse<ErrorsResponse>) => {
        if (response.body) {
          return response.body;
        } else {
          // If the response body is null, you might want to return a default or handle it accordingly
          throw new Error('Response body is null.');
        }
      }),
      catchError(error => {
        // Handle errors here if needed
        console.error('Error:', error);
        throw error;
      })
    );
  }
}