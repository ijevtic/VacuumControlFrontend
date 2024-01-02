import { Component, OnInit } from '@angular/core';
import { ErrorResponse, ErrorsResponse } from 'src/app/model';
import { HistoryService } from 'src/app/services/history/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{
  historyEntries: ErrorResponse[] = [];

  constructor(private historyService: HistoryService) {
    this.historyService.getAll().subscribe((data: ErrorsResponse)=>{
      this.historyEntries = data.errors;
    })  
  }

  ngOnInit() {
    // this.getHistory();
  }
}
