import { Component, OnInit } from '@angular/core';
import { MFServiceService } from '../mfservice.service';
import { Observable } from 'rxjs';
import { WatchlistserviceService } from '../Services/watchlistservice.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{


  mfn?:any=[];

  constructor(private mfservice:MFServiceService,
    private watchlistService:WatchlistserviceService
    ){}

  ngOnInit(): void {
    this.mfservice.getMF().subscribe(res=>{
      this.mfn=res.data;
      console.log(res.data);
    }
    )
  }
  addToWatchlist(item: any) {
    this.watchlistService.addToWatchlist(item); 
      
  }

}
