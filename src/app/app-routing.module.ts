import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { UsersComponent } from 'src/app/components/users/users.component';
import { AuthGuard } from './auth.guard';
import { AddUserComponent } from 'src/app/components/add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    component: UsersComponent,
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard]
  },
  {
    path: "homepage",
    component: UsersComponent,
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard]
  },
  {
    path: "add-user",
    component: AddUserComponent,
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard]
  },
  {
    path: "edit-user",
    component: EditUserComponent,
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
