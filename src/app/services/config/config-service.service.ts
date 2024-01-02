import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private token: string;
  private permissions: Map<String, Boolean>;
  private permCreate = environment.createPermissions
  private permRead = environment.readPermissions
  private permUpdate = environment.updatePermissions
  private permDelete = environment.deletePermissions
  private permVacuumAdd = environment.vacuumAddPermissions
  private permVacuumRemove = environment.vacuumRemovePermissions
  private permVacuumStart = environment.vacuumStartPermissions
  private permVacuumStop = environment.vacuumStopPermissions
  private permVacuumDischarge = environment.vacuumDischargePermissions
  private permVacuumSearch = environment.vacuumSearchPermissions

  constructor() {
    this.token = '';
    this.permissions = new Map<String, Boolean>()
  }

  setToken(token: string): void {
    localStorage.setItem('jwt', token);
    this.token = token;
    //get permissions from token claims
    this.updatePermissions();

    console.log(this.permissions);
  }

  getToken(): string {
    return this.token;
  }

  isLoggedIn(): boolean {
    return this.token !== '' && this.token !== null;
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.token = '';
    this.permissions.clear();
  }

  refreshToken(): void {
    const jwt = localStorage.getItem('jwt');
    if (jwt !== null) {
      this.token = jwt;
      this.updatePermissions();
    } else {
      this.token = '';
    }
  }

  updatePermissions(): void {
    const helper = new JwtHelperService();
    let decodedToken = helper.decodeToken(this.token);
    console.log(decodedToken);
    // Extract permissions
    let arr = decodedToken.roles;
    for (let i = 0; i < arr.length; i++) {
      this.permissions.set(arr[i], true);
    }

    console.log(this.permissions);
  }

  checkUserPermission(permission: string): boolean {
    return this.permissions.has(permission);
  }

  checkDeletePermission(): boolean {
    return this.permissions.has(this.permDelete);
  }

  checkCreatePermission(): boolean {
    return this.permissions.has(this.permCreate);
  }

  checkUpdatePermission(): boolean {
    return this.permissions.has(this.permUpdate);
  }

  checkReadPermission(): boolean {
    return this.permissions.has(this.permRead);
  }

  checkVacuumAddPermission(): boolean {
    return this.permissions.has(this.permVacuumAdd);
  }

  checkVacuumRemovePermission(): boolean {
    return this.permissions.has(this.permVacuumRemove);
  }

  checkVacuumStartPermission(): boolean {
    console.log(this.token)
    console.log("trenutni token")
    console.log(this.permissions)
    return this.permissions.has(this.permVacuumStart);
  }

  checkVacuumStopPermission(): boolean {
    return this.permissions.has(this.permVacuumStop);
  }

  checkVacuumDischargePermission(): boolean {
    return this.permissions.has(this.permVacuumDischarge);
  }

  checkVacuumSearchPermission(): boolean {
    return this.permissions.has(this.permVacuumSearch);
  }
}
