import { Component, Inject, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxMatDatetimepicker } from '@angular-material-components/datetime-picker';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { VacuumService } from 'src/app/services/vacuum/vacuum.service';
import { ScheduleRequest } from 'src/app/model';

@Component({
  selector: 'app-schedule-dialog',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.css']
})
export class ScheduleDialogComponent {

  scheduleForm: FormGroup;
  statuses: string[];
  dateControl: FormControl<any>;
  //@ts-ignore
  @Input() status: string;
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
  @ViewChild('picker') picker: NgxMatDatetimepicker<Date>;

  constructor(
    public dialogRef: MatDialogRef<ScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private vacuumService: VacuumService
  ) {
    this.status = '';
    this.scheduleForm = this.fb.group({
      status: ['', Validators.required], // Single, mandatory status selection
      // formDate: ['', Validators.required]
      // Add other form controls as needed
    });
    this.statuses = data.statuses;

    this.dateControl = new FormControl(new Date());
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

  schedule(): void {
    // Access selected status value from the form
    const selectedStatus = this.scheduleForm.value.status;
    var formDate = this.dateControl.value ? Math.floor(this.dateControl.value.getTime() / 1000): null;
    //get current time in unix seconds
    var currentTime = Math.floor(Date.now() / 1000);
    if(formDate == null || formDate + 10 < currentTime){
      this.notificationService.showNotification("Invalid date");
      return;
    }
    const request: ScheduleRequest = {
      vacuumName: this.data.name,
      time: formDate
    }
    this.vacuumService.scheduleVacuum(request, selectedStatus).subscribe(
      (response) => {
        if (response == 200) {
          this.notificationService.showNotification('Vacuum scheduled successfully');
        }
        else {
          this.notificationService.showNotification('Error scheduling vacuum');
        }
      },
      (error) => {
        // Handle errors
        console.error('Error:', error);
      }
    )
    this.dialogRef.close();
  }

}
