import { Component, inject } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  router = inject(Router);
  constructor() { 

  }

  logout() {
    this.router.navigate(['login'])
    localStorage.removeItem('jwt');

  }
}
