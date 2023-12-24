import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private token: string;

  constructor() {
    this.token = '';
  }

  setToken(token: string): void {
    localStorage.setItem('jwt', token);
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isLoggedIn(): boolean {
    return this.token !== '' && this.token !== null;
  }

  refreshToken(): void {
    const jwt = localStorage.getItem('jwt');
    if (jwt !== null) {
      this.token = jwt;
    } else {
      this.token = '';
    }
  }
}
