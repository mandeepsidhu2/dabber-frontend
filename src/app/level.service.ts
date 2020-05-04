import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { headersToString } from 'selenium-webdriver/http';
import { stringify } from 'querystring';
import { formatDate } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class LevelService {
  baseUrl = "http://localhost:3000";
  constructor(private http: HttpClient,private cookieService: CookieService) { }
  endpoint = this.baseUrl+'/api/v1/increase_easy';
  ob:any={}
  increaseLevel(): Observable<any> {
    this.ob.level="easy";this.ob.completed=5;this.ob.date=formatDate(new Date(), 'MM-dd-yyyy', 'en-US')
    let headers=new HttpHeaders().set('token',atob(this.cookieService.get('token')));
    headers.set('Content-Type','application/json').set('Accept','application/json');
    return this.http.post<any>(this.endpoint,this.ob,{headers});
}
}
