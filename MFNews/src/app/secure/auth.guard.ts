import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable(
  {
    providedIn: 'root'
  }
)

export class authGuard implements CanActivate{
constructor(private auth: AuthService, private router: Router, private toast: NgToastService){

}

  canActivate(): boolean{
    if(this.auth.isLoggedIn())
    {
      return true;
    }
    else{
      this.toast.error({detail: "Error", summary: "Please login First!"});
      this.router.navigate(['Login']);
      return false;
    }
  
}
 
}
