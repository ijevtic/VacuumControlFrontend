import { Component, OnInit, inject } from '@angular/core';
import {Router, NavigationExtras} from "@angular/router";
import { User, UsersResponse } from 'src/app/model';
import { ConfigService } from 'src/app/services/config/config-service.service';
import { EditService } from 'src/app/services/edit/edit.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  constructor(private configService: ConfigService, private userService: UserService, 
    private editService: EditService, private router: Router, private notificationService: NotificationService) { 

  }
  
  ngOnInit(): void {
    if(!this.configService.checkReadPermission()) {
      this.notificationService.showNotification('You don\'t have permission to view users');
      return;
    }
    this.userService.getAll().subscribe((data: UsersResponse)=>{
      this.users = data.users;
      console.log(data.users);
    })  
  }

  logout() {
    this.configService.logout();
    this.router.navigate(['login']);
  }

  editUser(user: User) {
    this.editService.setUser(user);
  
    this.router.navigate(['edit-user']);
  }

  addUser() {
    this.router.navigate(['add-user']);
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.email).subscribe((data: any)=>{
      if (data == 200) {
        this.notificationService.showNotification('User deleted successfully');
        this.router.navigate(['/users']);
      } else {
        this.notificationService.showNotification('Error deleting user');
      }
    })
  }

  hasViewPermission(): boolean {
    return this.configService.checkReadPermission();
  }

  hasEditPermission(): boolean {
    return this.configService.checkUpdatePermission();
  }

  hasDeletePermission(): boolean {
    return this.configService.checkDeletePermission();
  }

  hasAddPermission(): boolean {
    return this.configService.checkCreatePermission();
  }
}
