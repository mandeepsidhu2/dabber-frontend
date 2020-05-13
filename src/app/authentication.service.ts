import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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
   this.endpoint=this.endpoint+"/api/v1/login"
    let headers=new HttpHeaders().set('token',access_token)

    return this.http.get<any>(this.endpoint,{headers}).pipe(map(data => {
      console.log(data.user)
      this.cookieService.set('token', btoa(data.user.token));
  }));
}

logout() {
this.cookieService.delete('token');

}
}

