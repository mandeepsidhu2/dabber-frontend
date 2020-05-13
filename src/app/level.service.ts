import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable} from 'rxjs';
import { formatDate } from '@angular/common';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient,private cookieService: CookieService) { }
  endpoint=""
  ob:any={}
  getFilteredData(emailInitials:string,pageIndex:number,pageSize:number){
    let tableData={pageIndex:null,pageSize:null,emailInitials:null};
    tableData.pageIndex=pageIndex;tableData.pageSize=pageSize;tableData.emailInitials=emailInitials;
    this.endpoint=this.baseUrl+'/api/v1/filter_all';
    let headers=new HttpHeaders().set('token',atob(this.cookieService.get('token')));
    headers.set('Content-Type','application/json').set('Accept','application/json');
    return this.http.post<any>(this.endpoint,tableData,{headers});
  }
  getAllData(pageIndex:number,pageSize:number):Observable<any>{
    let tableData={pageIndex:null,pageSize:null};
    tableData.pageIndex=pageIndex;tableData.pageSize=pageSize
    this.endpoint=this.baseUrl+'/api/v1/all';
    let headers=new HttpHeaders().set('token',atob(this.cookieService.get('token')));
    headers.set('Content-Type','application/json').set('Accept','application/json');
    return this.http.post<any>(this.endpoint,tableData,{headers});
  }
  getTableLength(){
    this.endpoint=this.baseUrl+'/api/v1/size';
    let headers=new HttpHeaders().set('token',atob(this.cookieService.get('token')));
    headers.set('Content-Type','application/json').set('Accept','application/json');
    return this.http.get<any>(this.endpoint,{headers});
  }
  getUserData():Observable<any>{
    this.endpoint=this.baseUrl+'/api/v1/fetch';
    let headers=new HttpHeaders().set('token',atob(this.cookieService.get('token')));
    headers.set('Content-Type','application/json').set('Accept','application/json');
    return this.http.get<any>(this.endpoint,{headers});
  }
  changeLevel(level:string,updateTo:number): Observable<any> {
    this.endpoint = this.baseUrl+'/api/v1/change';
    this.ob.level=level;this.ob.completed=updateTo;this.ob.date=formatDate(new Date(), 'MM-dd-yyyy', 'en-US')
    let headers=new HttpHeaders().set('token',atob(this.cookieService.get('token')));
    console.log(atob(this.cookieService.get('token')))
    headers.set('Content-Type','application/json').set('Accept','application/json');
    return this.http.post<any>(this.endpoint,this.ob,{headers});
}

}
