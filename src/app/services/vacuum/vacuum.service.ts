import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../config/config-service.service';
import { AddVacuumRequest, ScheduleRequest, SearchRequest, VacuumResponse } from 'src/app/model';

@Injectable({
  providedIn: 'root'
})
export class VacuumService {
  private apiUrl = environment.vacuumEndpoint;

  constructor(private httpClient: HttpClient, private configService: ConfigService) {}

  search(name: string| null, status: string[]| null, dateFrom: number| null, dateTo: number| null): Observable<VacuumResponse> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.configService.getToken()
    });

    var body: SearchRequest = {};
    if (name != null) {
      body['name'] = name;
    }
    if (status != null) {
      body['status'] = status;
    }
    if (dateFrom != null) {
      body['dateFrom'] = dateFrom;
    }
    if (dateTo != null) {
      body['dateTo'] = dateTo;
    }

    return this.httpClient.post<VacuumResponse>(this.apiUrl + '/search', body, { headers, observe: 'response' })
    .pipe(
      map((response: HttpResponse<VacuumResponse>) => {
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

  addVacuum(vacuum: AddVacuumRequest): Observable<any> {
      
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.configService.getToken()
    });

    return this.httpClient.post<any>(this.apiUrl + '/add', vacuum, { headers, observe: 'response' })
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

  removeVacuum(vacuumName: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.configService.getToken()
    });

    return this.httpClient.delete<any>(this.apiUrl + '/remove/' + vacuumName, { headers, observe: 'response' })
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

  dischargeVacuum(vacuumName: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.configService.getToken()
    });

    return this.httpClient.post<any>(this.apiUrl + '/discharge/' + vacuumName, {}, { headers, observe: 'response' })
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

  startVacuum(vacuumName: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.configService.getToken()
    });
    console.log(this.configService.getToken());
    console.log(vacuumName)

    return this.httpClient.post<any>(this.apiUrl + '/start/' + vacuumName, {}, { headers, observe: 'response' })
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

  stopVacuum(vacuumName: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.configService.getToken()
    });

    return this.httpClient.post<any>(this.apiUrl + '/stop/' + vacuumName, {}, { headers, observe: 'response' })
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

  scheduleDischargeVacuum(scheduleRequest: ScheduleRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.configService.getToken()
    });

    return this.httpClient.post<any>(this.apiUrl + '/schedule-discharge', scheduleRequest, { headers, observe: 'response' })
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

  scheduleStartVacuum(scheduleRequest: ScheduleRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.configService.getToken()
    });

    return this.httpClient.post<any>(this.apiUrl + '/schedule-start', scheduleRequest, { headers, observe: 'response' })
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

  scheduleStopVacuum(scheduleRequest: ScheduleRequest): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.configService.getToken()
    });

    return this.httpClient.post<any>(this.apiUrl + '/schedule-stop', scheduleRequest, { headers, observe: 'response' })
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

  hasSearchPermission(): boolean {
    return this.configService.checkVacuumSearchPermission();
  }

  hasAddPermission(): boolean {
    return this.configService.checkVacuumAddPermission();
  }

  hasRemovePermission(): boolean {
    return this.configService.checkVacuumRemovePermission();
  }

  hasStartPermission(): boolean {
    return this.configService.checkVacuumStartPermission();
  }

  hasStopPermission(): boolean {
    return this.configService.checkVacuumStopPermission();
  }

  hasDischargePermission(): boolean {
    return this.configService.checkVacuumDischargePermission();
  }
}