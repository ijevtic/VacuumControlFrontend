import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddUserRequest, EditUserRequest } from 'src/app/model';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent{

  editForm!: FormGroup;
  user!: AddUserRequest;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService,
    private route: ActivatedRoute, private notificationService: NotificationService) {
    this.editForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      createP: false,
      updateP: false,
      deleteP: false,
      readP: false,
      readVP: false,
      addVP: false,
      removeVP: false,
      startVP: false,
      stopVP: false,
      dischargeVP: false,
    });
  }
  

  onSubmit() {
    const formData = this.editForm.value;
    this.user = {
      firstName:formData.firstName,
      lastName: formData.lastName,
      password: formData.password,
      email: formData.email,
      username: formData.username,
      permissions: []
    };
    
    if (formData.createP) {
      this.user.permissions.push(environment.createPermissions);
    }
    if (formData.updateP) {
      this.user.permissions.push(environment.updatePermissions);
    }
    if (formData.deleteP) {
      this.user.permissions.push(environment.deletePermissions);
    }
    if (formData.readP) {
      this.user.permissions.push(environment.readPermissions);
    }
    if (formData.readVP) {
      this.user.permissions.push(environment.vacuumSearchPermissions);
    }
    if (formData.addVP) {
      this.user.permissions.push(environment.vacuumAddPermissions);
    }
    if (formData.removeVP) {
      this.user.permissions.push(environment.vacuumRemovePermissions);
    }
    if (formData.startVP) {
      this.user.permissions.push(environment.vacuumStartPermissions);
    }
    if (formData.stopVP) {
      this.user.permissions.push(environment.vacuumStopPermissions);
    }
    if (formData.dischargeVP) {
      this.user.permissions.push(environment.vacuumDischargePermissions);
    }
    this.userService.addUser(this.user).subscribe(
      (response) => {
        if (response == 201) {
          this.notificationService.showNotification('User added successfully');
          this.router.navigate(['/users']);
        }
        else {
          this.notificationService.showNotification('Error adding user');
        }
      },
      (error) => {
        // Handle errors
        console.error('Error:', error);
      }
    );
  }
}