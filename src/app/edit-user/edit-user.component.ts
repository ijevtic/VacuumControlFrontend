import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditService } from '../services/edit/edit.service';
import { EditUser, EditUserRequest, User } from '../model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent  implements OnInit{

  editForm!: FormGroup;
  user!: EditUserRequest;

  constructor(private formBuilder: FormBuilder, private router: Router, private editService: EditService, private route: ActivatedRoute) {}



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
    this.editService.editUser(this.user).subscribe(
      (response) => {
        if (response == 200) {
          alert('User updated successfully');
          this.editService.clearUser();
          this.router.navigate(['/users']);
        }
        else {
          alert('Error updating user');
        }
      },
      (error) => {
        // Handle errors
        console.error('Error:', error);
      }
    );
  }
}