import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = environment.baseUrl;
  constructor(private socket: Socket,private http: HttpClient,private cookieService:CookieService) { }
  public sendPost(post) {
    this.socket.emit('new-post', post);
  }
  public  getPostsRealTime() {
  let observable = new Observable(observer => {
    this.socket.on('recieve-posts',function(data) {
      observer.next(data);    
    });
  }) 
  return observable;
  } 
  public createPost(post){
    let endpoint=this.baseUrl+'/api/v1/create_post';
    let headers=new HttpHeaders().set('token',atob(this.cookieService.get('token')));
    headers.set('Content-Type','application/json').set('Accept','application/json');
    return this.http.post<any>(endpoint,post,{headers});
  }
  public getPosts(){
    let endpoint=this.baseUrl+'/api/v1/posts';
    let headers=new HttpHeaders().set('token',atob(this.cookieService.get('token')));
    headers.set('Content-Type','application/json').set('Accept','application/json');
    return this.http.get<any>(endpoint,{headers});
  }
}
