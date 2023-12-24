import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/services/config/config-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private configService: ConfigService, private router: Router) {
  }

  ngOnInit(): void {
    console.log("local storage");
    console.log(localStorage.getItem('jwt'));
    if(this.configService.isLoggedIn()) {
      this.router.navigate(['homepage']);
    }
  }


  signIn() {
    if (this.email === 'admin' && this.password === 'admin') {
      this.configService.setToken('1234567890');
      this.router.navigate(['homepage']);

      // alert('Login successful');
    } else {
      // alert('Login failed');
    }


  }
}
