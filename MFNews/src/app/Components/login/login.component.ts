import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  type: string = "password";
  istext: boolean = false;
  eyeIcon: string = "fa fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService,
    private router: Router,
    private toast : NgToastService
    ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  hideShowPass()
  {
    this.istext = !this.istext;
    this.istext? this.eyeIcon= "fa fa-eye" : this.eyeIcon = "fa fa-eye-slash";
    this.istext ? this.type = "text" : this.type = "password";
  }

  onLogin(){
    if(this.loginForm.valid)
    {
      console.log(this.loginForm.value);

      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          this.auth.storeUser(res.username);
         this.toast.success({detail: "SUCCESS", summary:res.message, duration: 5000});
         
         this.router.navigate(['/dashboard']);
         //console.log(res.message);
        },
        error:(err)=>{
          console.log(err?.error.message);
          this.toast.error({detail: "ERROR", summary:"Something went wrong", duration: 5000});
        }
      })
    }
    else{

      this.validateAllFormFields(this.loginForm);
    }
  }

  private validateAllFormFields(formGroup: FormGroup)
  {
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl)
      {
        control?.markAsDirty({onlySelf:true});
      }else if(control instanceof FormGroup){
        this.validateAllFormFields(control);
      }
    })
  }
}
