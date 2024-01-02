import { Component, ViewChild, ElementRef } from '@angular/core';
import { SearchRequest, Vacuum, VacuumResponse } from 'src/app/model';
import { VacuumService } from 'src/app/services/vacuum/vacuum.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { NgxMatDatetimepicker } from '@angular-material-components/datetime-picker';
import { ThemePalette } from '@angular/material/core';
import { BooleanInput } from '@angular/cdk/coercion';

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



  constructor(private vacuumService: VacuumService, private fb: FormBuilder) {
    this.vacuumService.search(null, null, null, null).subscribe((data: VacuumResponse)=>{
      console.log(data.vacuums);
      this.vacuums = data.vacuums;
    })
    // this.picker = new MatDatepicker<Date>();
    this.dateControlFrom = new FormControl(new Date());
    this.dateControlTo = new FormControl(new Date());
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
    var formName = this.searchForm.value.name != '' ? this.searchForm.value.name : null;
    var formStatus = this.searchForm.value.status.length != 0 ? this.searchForm.value.status : null;
    var formDateFrom = this.dateControlFrom.value ? Math.floor(this.dateControlFrom.value.getTime() / 1000): null;
    var formDateTo = this.dateControlTo.value ? Math.floor(this.dateControlTo.value.getTime() / 1000): null;
    this.vacuumService.search(formName, formStatus, formDateFrom, formDateTo).subscribe((data: VacuumResponse)=>{
      this.vacuums = data.vacuums;
    })
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
        alert('Vacuum started successfully');
      } else {
        alert('Vacuum failed to start');
      }
    })
  }

  stopVacuum(vacuum: Vacuum) {
    this.vacuumService.stopVacuum(vacuum.name).subscribe((data: any)=>{
      if (data >= 200 && data < 300) {
        alert('Vacuum stopped successfully');
      } else {
        alert('Vacuum failed to stop');
      }
    })
  }

  dischargeVacuum(vacuum: Vacuum) {
    this.vacuumService.dischargeVacuum(vacuum.name).subscribe((data: any)=>{
      if (data >= 200 && data < 300) {
        alert('Vacuum removed successfully');
      } else {
        alert('Vacuum failed to remove');
      }
    })
  }

  removeVacuum(vacuum: Vacuum) {
    this.vacuumService.removeVacuum(vacuum.name).subscribe((data: any)=>{
      if (data >= 200 && data < 300) {
        alert('Vacuum removed successfully');
      } else {
        alert('Vacuum failed to remove');
      }
    })
  }
}