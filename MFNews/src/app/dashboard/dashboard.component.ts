import { Component, OnInit } from '@angular/core';
import { MFServiceService } from '../mfservice.service';
import { Observable } from 'rxjs';
import { WatchlistserviceService } from '../Services/watchlistservice.service';
import { FormGroup } from '@angular/forms';
import { WatchlistData } from '../Model/watchlist.model';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  watchlistDataObj: WatchlistData = new WatchlistData();


  mfn?:any=[];

  constructor(private mfservice:MFServiceService,
    private watchlistService:WatchlistserviceService,
    private toast : NgToastService
    ){}

  ngOnInit(): void {
    this.mfservice.getMF().subscribe(res=>{
      this.mfn=res.data;
      console.log(res.data);
    }
    )
  }
  addToWatchlist(item: any, items: any): void {
    this.watchlistDataObj.username = localStorage.getItem('username');
    this.watchlistDataObj.symbol = item.symbol;
    this.watchlistDataObj.url = items.url;
    this.watchlistDataObj.image_url = items.image_url;
    this.watchlistDataObj.name = item.name;
    this.watchlistDataObj.country = item.country;
    this.watchlistDataObj.industry = item.industry;    
    this.watchlistDataObj.type = item.type;
    this.watchlistDataObj.matchScore = item.match_score;
    this.watchlistDataObj.sentimentScore = item.sentiment_score;
    
    console.log(this.watchlistDataObj);

    this.watchlistService.addToWatchlist(this.watchlistDataObj).subscribe({
      next: (res)=>{
        console.log(res);
        this.toast.success({detail: "SUCCESS", summary:res.message, duration: 5000});
      },
      error: (err)=>{
        console.log(err);
        this.toast.error({detail: "ERROR", summary:err.message, duration: 5000});
      }
    })
  }

}
