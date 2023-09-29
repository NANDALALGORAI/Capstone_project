import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WatchlistserviceService implements OnInit {


  private baseUrl:string = "https://localhost:7035/api/WatchList";
  private watchlistItems: any[] = []; 

  constructor(private http : HttpClient,
    private authService : AuthService
    ) {}

  ngOnInit(): void {

  }

  addToWatchlist(item: any) {
    console.log(item);
    return this.http.post<any>(`${this.baseUrl}/watchlist`, item);
  }

  getWatchlistItems(): any[] {
    return this.watchlistItems; 
  }

  getItems() {
    return this.http.get(`${this.baseUrl}/byUsername/${this.authService.getUser()}`)
    .pipe(map((res:any) => {
      return res;
    }));
}
  

  removeFromWatchlist(username: any, name: any, country: any, industry: any) {
    
    return this.http.delete<any>(`${this.baseUrl}/${username},${name},${country},${industry}`);
  }

}
