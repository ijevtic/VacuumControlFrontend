import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../config/config-service.service';
import { User, UsersResponse } from 'src/app/model';

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
}
