import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config/config-service.service';
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private readonly authEndpoint = environment.authEndpoint
  email: string = '';
  password: string = '';

  constructor(private configService: ConfigService, private router: Router, 
    private httpClient: HttpClient, private authService: AuthService,
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    console.log("local storage");
    console.log(localStorage.getItem('jwt'));
    if(this.configService.isLoggedIn()) {
      this.router.navigate(['homepage']);
    }
  }


  signIn() {

    this.authService.login(this.email, this.password).subscribe(
      response => {
        // Handle the response as needed
        this.configService.setToken(response.jwt);
        this.router.navigate(['homepage']);
      },
      error => {
        // Handle errors
        this.notificationService.showNotification('Login failed. Please try again.');
        console.error('Login error:', error);
      }
    );
  }
}
