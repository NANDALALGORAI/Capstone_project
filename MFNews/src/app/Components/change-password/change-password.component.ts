import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
  username!: string;
  oldPassword!: string;
  newPassword!: string;
  changepasswordForm!: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.changepasswordForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
  }

  onChangePassword() {
    // if (!this.username || !this.oldPassword || !this.newPassword) {
    //   this.snackBar.open('Please fill in all fields.', 'Close', { duration: 5000 });
    //   return;
    // }

    const apiUrl = 'https://localhost:7204/api/User/change-password';

    const data = {
      Username: this.username,
      OldPassword: this.changepasswordForm.value.firstName,
      NewPassword: this.changepasswordForm.value.lastName
    };

    this.http.put(apiUrl, data).subscribe(
      response => {
        console.log(response);
        //this.snackBar.open('Password changed successfully!', 'Close', { duration: 5000 });
      },
      error => {
        console.error(error);
        //this.snackBar.open('An error occurred while changing the password.', 'Close', { duration: 5000 });
      }
    );
}
}
