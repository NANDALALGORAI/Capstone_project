import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MFServiceService {

  constructor(private http:HttpClient) { }

  getMF():Observable<any>{
    return this.http.get('https://api.marketaux.com/v1/news/all?symbols=all&filter_entities=false&language=en&api_token=tetJz1Weyrz7fFGCGheXACVx30aNKDkMBL5qC5wt')
    .pipe(map((res:any) => {
      return res;
    }))

  }
}
