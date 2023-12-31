import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string = "https://localhost:7204/api/User";

  constructor(private http : HttpClient, private router:Router) { }

  signup(userObj:any)
  {
    return this.http.post<any>(`${this.baseUrl}/register`, userObj);
  }

  login(loginObj:any)
  {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, loginObj);
  }

  updateUser(userObj:any)
  {
    return this.http.put<any>(`${this.baseUrl}`, userObj);
  }

  


  getprofile()
  {
    return this.http.get<any>(`${this.baseUrl}/${this.getUser()}`)
    .pipe(map((res:any) => {
      return res;
    }));
  }

  

  storeToken(tokenValue:string)
  {
    localStorage.setItem('token', tokenValue);
  }

  storeUser(usernameValue:string)
  {
    localStorage.setItem('username', usernameValue);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getUser(){
    return localStorage.getItem('username');
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  logout(){
    localStorage.clear();
    
  }
}
