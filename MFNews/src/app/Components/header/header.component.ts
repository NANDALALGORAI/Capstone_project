import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //loggedIn: boolean = false;
  username!: any;

  constructor(private authService: AuthService, private auth: AuthService) {}

  ngOnInit(): void {

    this.username = this.auth.getUser();
   // this.loggedIn = this.authService.isLoggedIn();
    // if (this.loggedIn) {
    //   this.username = this.userService.getUsername();
    // 
  }

  loggedIn(): boolean {
    return this.authService.isLoggedIn();

  }

  logout() {
    this.auth.logout();
  }
  

}
