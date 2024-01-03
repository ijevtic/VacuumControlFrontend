import { Component, ViewChild, ElementRef } from '@angular/core';
import { SearchRequest, Vacuum, VacuumResponse } from 'src/app/model';
import { VacuumService } from 'src/app/services/vacuum/vacuum.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgxMatDatetimepicker } from '@angular-material-components/datetime-picker';
import { ThemePalette } from '@angular/material/core';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleDialogComponent } from '../schedule-dialog/schedule-dialog.component';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  vacuums: Vacuum[] = [];
  searchForm: FormGroup = new FormGroup({});
  statuses = [ "Running", "Stopped", "Discharging"];
  dateControlFrom: FormControl<any>;
  dateControlTo: FormControl<any>;
  minDate: any;
  maxDate: any;
  disabled: boolean;
  showSeconds: boolean;
  stepSecond: number;
  enableMeridian: boolean;
  hideTime: boolean;
  disableMinute: boolean;
  stepHour: number;
  touchUi: boolean;
  color: ThemePalette;
  showSpinners: boolean;
  stepMinute: number;
  //@ts-ignore
  @ViewChild('picker') pickerFrom: NgxMatDatetimepicker<Date>;
  //@ts-ignore
  @ViewChild('picker') pickerTo: NgxMatDatetimepicker<Date>;
  displayedColumns: string[] = ['name', 'status', 'actions'];



  constructor(private vacuumService: VacuumService, private fb: FormBuilder,
    private notificationService: NotificationService,
    private dialog: MatDialog) {
    this.vacuumService.search(null, null, null, null).subscribe((data: VacuumResponse)=>{
      console.log(data.vacuums);
      this.vacuums = data.vacuums;
    })
    // this.picker = new MatDatepicker<Date>();
    this.dateControlFrom = new FormControl();
    this.dateControlTo = new FormControl();
    this.minDate = new Date();
    this.maxDate = new Date();
    this.disabled = false;
    this.showSeconds = false;
    this.stepSecond = 1;
    this.enableMeridian = false;
    this.hideTime = false;
    this.disableMinute = false;
    this.stepHour = 1;
    this.touchUi = false;
    this.color = 'primary';
    this.showSpinners = true;
    this.stepMinute = 1;

  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      name: [''],
      status: [[]],
      dateFrom: [null],
      dateTo: [null],
    });
  }

  onSubmit(): void {
    this.refresh();
  }

  refresh(): void {
    const [formName, formStatus, formDateFrom, formDateTo] = this.pickupFormInput();
    this.vacuumService.search(formName, formStatus, formDateFrom, formDateTo).subscribe((data: VacuumResponse)=>{
      this.vacuums = data.vacuums;
    })
  }

  pickupFormInput(): [string, string[], number | null, number | null] {
    // Replace these with the actual values you want to return
    const formName = this.searchForm.value.name != '' ? this.searchForm.value.name : null;
    const formStatus = this.searchForm.value.status.length != 0 ? this.searchForm.value.status : null;
    const formDateFrom = this.dateControlFrom.value ? Math.floor(this.dateControlFrom.value.getTime() / 1000): null;
    const formDateTo = this.dateControlTo.value ? Math.floor(this.dateControlTo.value.getTime() / 1000): null;
  
    return [formName, formStatus, formDateFrom, formDateTo];
  }

  hasStartPermission(): boolean {
    return this.vacuumService.hasStartPermission();
  }

  hasStopPermission(): boolean {
    return this.vacuumService.hasStopPermission();
  }

  hasRemovePermission(): boolean {
    return this.vacuumService.hasRemovePermission();
  }

  hasDischargePermission(): boolean {
    return this.vacuumService.hasDischargePermission();
  }

  startVacuum(vacuum: Vacuum) {
    this.vacuumService.startVacuum(vacuum.name).subscribe((data: any)=>{
      if (data >= 200 && data < 300) {
        this.notificationService.showNotification('Vacuum started successfully');
      } else {
        this.notificationService.showNotification('Vacuum failed to start');
      }
    })
  }

  stopVacuum(vacuum: Vacuum) {
    this.vacuumService.stopVacuum(vacuum.name).subscribe((data: any)=>{
      if (data >= 200 && data < 300) {
        this.notificationService.showNotification('Vacuum stopped successfully');
      } else {
        this.notificationService.showNotification('Vacuum failed to stop');
      }
    })
  }

  dischargeVacuum(vacuum: Vacuum) {
    this.vacuumService.dischargeVacuum(vacuum.name).subscribe((data: any)=>{
      if (data >= 200 && data < 300) {
        this.notificationService.showNotification('Vacuum discharged successfully');
      } else {
        this.notificationService.showNotification('Vacuum failed to discharge');
      }
    })
  }

  removeVacuum(vacuum: Vacuum) {
    this.vacuumService.removeVacuum(vacuum.name).subscribe((data: any)=>{
      if (data >= 200 && data < 300) {
        this.vacuums = this.vacuums.filter((value, index, arr) => {
          return value.name != vacuum.name;
        });
        this.notificationService.showNotification('Vacuum removed successfully');
      } else {
        this.notificationService.showNotification('Vacuum failed to remove');
      }
    })
  }

  scheduleVacuum(vacuum: Vacuum): void {
    var statuses = [];
    if(this.hasStartPermission()){
      statuses.push("Start");
    }
    if(this.hasStopPermission()){
      statuses.push("Stop");
    }
    if(this.hasDischargePermission()){
      statuses.push("Discharge");
    }
    const dialogRef = this.dialog.open(ScheduleDialogComponent, {
      width: '400px', // Set the desired width
      data: {
        // Pass any data to the dialog if needed
        statuses: statuses,
        name: vacuum.name,
        // Add other data properties as needed
      },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle the result after the dialog is closed, if needed
      console.log('Dialog closed with result:', result);
    });
  }
}