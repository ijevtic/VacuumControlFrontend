import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import {HttpClientModule} from "@angular/common/http";
import { JwtHelperService } from '@auth0/angular-jwt';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HistoryComponent } from './components/history/history.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CustomDateFormatPipe } from './pipes/custom-date-format/custom-date-format.pipe';
import { SearchComponent } from './components/search/search.component';
import { VacuumStatusPipe } from './pipes/vacuum-status/vacuum-status.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
import { MatIconModule } from '@angular/material/icon';
import { AddVacuumComponent } from './components/add-vacuum/add-vacuum.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    HistoryComponent,
    CustomDateFormatPipe,
    SearchComponent,
    VacuumStatusPipe,
    AddVacuumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatTableModule,
    MatIconModule
  ],
  providers: [JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
