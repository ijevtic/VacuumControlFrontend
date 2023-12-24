import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'nwpd3-front';

  constructor(private configService: ConfigService) {
  }

  ngOnInit(): void {
    console.log('refreshing token')
    this.configService.refreshToken();
  }
}
