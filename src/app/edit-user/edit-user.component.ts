import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditService } from '../services/edit/edit.service';
import { EditUser, EditUserRequest, User } from '../model';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../services/notification/notification.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent  implements OnInit{

  editForm!: FormGroup;
  user!: EditUserRequest;

  constructor(private formBuilder: FormBuilder, private router: Router, 
    private editService: EditService, private route: ActivatedRoute, private notificationService: NotificationService) {}



  ngOnInit() {
    
    let user: EditUser | null = this.editService.getUser();
    if (user == null) {
      user = {
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        username: '',
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
      };
    }
    // Initialize the form with default values or empty values
    this.editForm = this.formBuilder.group({
      firstName: [user.firstName],
      lastName: [user.lastName],
      password: '',
      createP: [user.createP],
      updateP: [user.updateP],
      deleteP: [user.deleteP],
      readP: [user.readP],
      readVP: [user.readVP],
      addVP: [user.addVP],
      removeVP: [user.removeVP],
      startVP: [user.startVP],
      stopVP: [user.stopVP],
      dischargeVP: [user.dischargeVP],

    });

    this.user = {
      firstName:'',
      lastName: '',
      password: '',
      email: user.email,
      username: user.username,
      permissions: []
    };
  }
  

  onSubmit() {
    const formData = this.editForm.value;
    this.user.firstName = formData.firstName;
    this.user.lastName = formData.lastName;
    this.user.password = formData.password;
    
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
    this.editService.editUser(this.user).subscribe(
      (response) => {
        if (response == 200) {
          this.notificationService.showNotification('User updated successfully');
          this.editService.clearUser();
          this.router.navigate(['/users']);
        }
        else {
          this.notificationService.showNotification('Error updating user');
        }
      },
      (error) => {
        // Handle errors
        console.error('Error:', error);
      }
    );
  }
}