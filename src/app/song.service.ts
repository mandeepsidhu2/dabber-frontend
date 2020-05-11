import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  baseUrl = "https://evening-beyond-06490.herokuapp.com";
  //baseUrl = "http://localhost:3000";
  constructor(private http: HttpClient,private cookieService: CookieService) { }
  endpoint=""
  ob:any={}
  getAllData():Observable<any>{
    this.endpoint=this.baseUrl+'/api/v1/songs';
    let headers=new HttpHeaders().set('token',atob(this.cookieService.get('token')));
    headers.set('Content-Type','application/json').set('Accept','application/json');
    return this.http.get<any>(this.endpoint,{headers});
  }
}
