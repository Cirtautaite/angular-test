import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { ProcessHTTPMsgService } from './process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient,
    private ProcessHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL + 'leadership')
      .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  getLeader(id: string): Observable<Leader>{
    return this.http.get<Leader>(baseURL + 'leadership/' + id)
    .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<Leader>{
    return this.http.get<Leader>(baseURL + 'leadership?featured=true')
      .pipe(map(leaders => leaders[0]))
      .pipe(catchError(this.ProcessHTTPMsgService.handleError));
  }
}
