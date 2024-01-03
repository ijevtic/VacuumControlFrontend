import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { ConfigService } from './services/config/config-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanDeactivate<unknown> {

  constructor(private router: Router, private configService: ConfigService) {
    // TODO: return to this
    //localStorage.removeItem('api_token');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(localStorage.getItem('jwt') === null || localStorage.getItem('jwt') === '') {
      this.router.navigate(['login'])
      return false;
    }

    const requiredPermissions = this.getRequiredPermissionsForRoute(route);
    if (!this.configService.hasPermissions(requiredPermissions)) {
      this.router.navigate([''])
      return false;
    }

    return true;
  }

  private getRequiredPermissionsForRoute(route: ActivatedRouteSnapshot): string[] {
    // Extract and return the required permissions from the route data
    return route.data && route.data['requiredPermissions'] ? route.data['requiredPermissions'] : [];
  }



  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

}
