import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { UsersComponent } from 'src/app/components/users/users.component';
import { AuthGuard } from './auth.guard';
import { AddUserComponent } from 'src/app/components/add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HistoryComponent } from './components/history/history.component';
import { SearchComponent } from './components/search/search.component';
import { AddVacuumComponent } from './components/add-vacuum/add-vacuum.component';

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
    canDeactivate: [AuthGuard],
    data: { requiredPermissions: ['Create'] }
  },
  {
    path: "edit-user",
    component: EditUserComponent,
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard],
    data: { requiredPermissions: ['Update'] }
  },
  {
    path: "history",
    component: HistoryComponent,
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard]
  },
  {
    path: "search",
    component: SearchComponent,
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard],
    data: { requiredPermissions: ['SearchV'] }
  },
  {
    path: "add-vacuum",
    component: AddVacuumComponent,
    canActivate: [AuthGuard],
    canDeactivate: [AuthGuard],
    data: { requiredPermissions: ['AddV'] }
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
