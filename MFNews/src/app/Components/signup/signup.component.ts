import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  type: string = "password";
  typecnf: string = "password";
  istext: boolean = false;
  istextcnf: boolean = false;
  eyeIcon: string = "fa fa-eye-slash";
  eyeIconcnf: string = "fa fa-eye-slash";

  signupForm!: FormGroup;
  constructor(private fb:FormBuilder, private auth: AuthService,
    private router: Router
    ) {}
  

  ngOnInit(): void {
    this.signupForm = this.fb.group({

      email: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
      //passwordcnf: ['', [Validators.required, Validators.pattern('password')]]
    });
  }

  hideShowPass()
  {
    this.istext = !this.istext;
    this.istext? this.eyeIcon= "fa fa-eye" : this.eyeIcon = "fa fa-eye-slash";
    this.istext ? this.type = "text" : this.type = "password";
  }

  hideShowPasscnf()
  {
    this.istextcnf = !this.istextcnf;
    this.istextcnf? this.eyeIconcnf= "fa fa-eye" : this.eyeIconcnf = "fa fa-eye-slash";
    this.istextcnf ? this.typecnf = "text" : this.typecnf = "password";
  }

  onSignup(){
    if(this.signupForm.valid)
    {
      console.log(this.signupForm.value);

      this.auth.signup(this.signupForm.value).subscribe(
        {
          next:(res=>{
            alert(res.message);
            this.signupForm.reset();
            this.router.navigate(['/Login']);
          }),
          error:(err)=>{
            alert(err?.error.message);
            console.log(err?.error.message);
          }
        }
      )
    }
    else{

      this.validateAllFormFields(this.signupForm);
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
