import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private socket:Socket,private http: HttpClient,private cookieService:CookieService) { }
  baseUrl = environment.baseUrl;
  public sendLikeUnlike(post_id,likes) {
    this.socket.emit('send-like-unlike', post_id,likes);
  }
  public  getLikesRealTime() {
  let observable = new Observable(observer => {
    this.socket.on('recieve-like-unlike',function(data) {
      observer.next(data);    
    });
  }) 
  return observable;
  }
  public like_unlike(post_id){
    console.log(post_id)
    let endpoint=this.baseUrl+'/api/v1/like_unlike';
    let headers=new HttpHeaders().set('token',atob(this.cookieService.get('token')));
    let params=new HttpParams().set('post_id',post_id)
    headers.set('Content-Type','application/json').set('Accept','application/json');
    return this.http.get<any>(endpoint,{params,headers});
  }
}
