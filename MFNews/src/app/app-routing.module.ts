import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './secure/auth.guard';
import { WatchListComponent } from './Components/watch-list/watch-list.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';

const routes: Routes = [
  {path:'Login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'watchList',component:WatchListComponent, canActivate:[authGuard]},
  {path:'editprofile', component:EditProfileComponent,},
  {path:'', component:DashboardComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
