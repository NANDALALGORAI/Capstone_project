import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MFServiceService } from 'src/app/mfservice.service';
import { WatchlistserviceService } from 'src/app/Services/watchlistservice.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent {
  watchlistItems: any[] = [];
  loggedIn: boolean = true;
  id! : string;
  constructor(
    private watchlistService: WatchlistserviceService,
    private mfService: MFServiceService,
    private router: Router,
    private toast : NgToastService
  ) {}

  ngOnInit(): void {
    // Load watchlist items from the WatchlistService
    this.displayitem();
  
  }
displayitem(){
  this.watchlistService.getItems().subscribe(res=>{
    this.watchlistItems=res;
    
});
}


  removeFromWatchlist(user: any, name: any, country: any, industry: any) {
    this.watchlistService.removeFromWatchlist(user,name,country,industry).subscribe({
      next: (res) => {
        console.log(res);
        this.toast.success({detail: "SUCCESS", summary:res.message, duration: 5000});
        this.displayitem();

        // this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        //this.toast.error({detail: "ERROR", summary:err.message, duration: 5000});
        this.displayitem();
       // this.router.navigate(['/watchList']);
      }
    }); // Call the removeFromWatchlist method
  }


}
