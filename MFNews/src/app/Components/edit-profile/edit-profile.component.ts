import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { UserProfile } from 'src/app/Model/userdata';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  EditForm!: FormGroup;
  userprofileObj : UserProfile = new UserProfile();
  profiledata : any;
  constructor(private auth: AuthService,
    private fb: FormBuilder,
    private router: Router) {
  }

  ngOnInit(): void {
    this.auth.getprofile().subscribe(res => {
      console.log(res.username);
      this.profiledata = res;
     // console.log(this.profiledata)
    });
    this.EditForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
   
  
    //console.log(this.data.lastName);
    
  }
  // displaydata()
  // {
  //   this.auth.getprofile().subscribe(res => {
  //     this.data = res;
  //   })
  // }
  onEdit()
  {
    console.log(this.profiledata);
    this.userprofileObj.id = this.profiledata.id;
    this.userprofileObj.email = this.profiledata.email;
    this.userprofileObj.firstName = this.EditForm.value.firstName;
    this.userprofileObj.lastName = this.EditForm.value.lastName;
    this.userprofileObj.username = this.profiledata.username;
    this.userprofileObj.password = this.profiledata.password;
    this.userprofileObj.token = this.profiledata.token;
    console.log(this.userprofileObj);

    this.auth.updateUser(this.userprofileObj).subscribe({
      next:(res=>{
        //alert(res.message);
        
        this.router.navigate(['/dashboard']);
      }),
      error:(err)=>{
        //alert(err?.error.message);
        this.router.navigate(['/dashboard']);
        console.log(err?.error.message);
      }
    });
  }
}
