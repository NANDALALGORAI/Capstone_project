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
  constructor(
    private watchlistService: WatchlistserviceService,
    private mfService: MFServiceService,
    private router: Router,
    private toast : NgToastService
  ) {}

  ngOnInit(): void {
    // Load watchlist items from the WatchlistService
    this.watchlistService.getItems().subscribe(res=>{
      this.watchlistItems=res;
      console.log(res);
  });
  }
  removeFromWatchlist(item: any) {
    this.watchlistService.removeFromWatchlist(item).subscribe({
      next: (res) => {
        this.toast.success({detail: "SUCCESS", summary:res.message, duration: 5000});

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.toast.error({detail: "ERROR", summary:err.message, duration: 5000});
      }
    }); // Call the removeFromWatchlist method
  }


}
