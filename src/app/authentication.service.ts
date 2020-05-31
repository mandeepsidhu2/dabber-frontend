import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,private cookieService: CookieService) { }
 endpoint = environment.baseUrl
  login(access_token:string): Observable<any> {
   let endp=this.endpoint+"/api/v1/login"
    let headers=new HttpHeaders().set('token',access_token)

    return this.http.get<any>(endp,{headers}).pipe(map(data => {
      this.cookieService.set('token', btoa(data.user.token));
  }));
}
delete_user(email:string): Observable<any> {
  let endp=this.endpoint+"/api/v1/remove_user"
   let headers=new HttpHeaders().set('token',atob(this.cookieService.get('token')))
   headers.set('Content-Type','application/json').set('Accept','application/json');
  const params = new HttpParams().set('email', email)
   return this.http.get<any>(endp,{headers,params});
}
logout() {
this.cookieService.delete('token');

}
}

