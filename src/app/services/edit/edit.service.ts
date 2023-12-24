import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditUser, EditUserRequest, User } from 'src/app/model';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../config/config-service.service';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  user: EditUser | null;
  private apiUrl = environment.usersEndpoint;


  constructor(private httpClient: HttpClient, private configService: ConfigService) { 
    this.user = null;
  }

  setUser(user: User) {
    let createP = false;
    let deleteP = false;
    let updateP = false;
    let readP = false;
    for (let role of user.permissions) {
      if (role === environment.createPermissions) {
        createP = true;
      }
      if (role === environment.deletePermissions) {
        deleteP = true;
      }
      if (role === environment.updatePermissions) {
        updateP = true;
      }
      if (role === environment.readPermissions) {
        readP = true;
      }
    }
    this.user = {
      firstName: user.firstName,
      lastName: user.lastName,
      password: '',
      createP: createP,
      updateP: updateP,
      deleteP: deleteP,
      readP: readP,
      email: user.email,
      username: user.username
    };
  }

  getUser(): EditUser | null {
    return this.user;
  }

  clearUser() {
    this.user = null;
  }
  editUser(user: EditUserRequest): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.configService.getToken()
    });

    return this.httpClient.post(this.apiUrl + '/update', user, { headers, observe: 'response' })
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
