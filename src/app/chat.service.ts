import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl = environment.baseUrl;
  constructor(private socket: Socket,private http: HttpClient,private cookieService:CookieService) { }
 
  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }
public  getMessages() {
  let observable = new Observable(observer => {
    this.socket.on('recieve-message',function(data) {
      observer.next(data);    
    });
   
  })     
  return observable;
  } 
  public addMessageToChatHistory(userId:number,name:string,message:string){
    let ob={userId:userId,name:name,message:message}
    let endpoint=this.baseUrl+'/api/v1/add_to_chat';
    let headers=new HttpHeaders().set('token',atob(this.cookieService.get('token')));
    headers.set('Content-Type','application/json').set('Accept','application/json');
    return this.http.post<any>(endpoint,ob,{headers});
  } 
  public getAllChat(){
    let endpoint=this.baseUrl+'/api/v1/get_all_chat';
    let headers=new HttpHeaders().set('token',atob(this.cookieService.get('token')));
    headers.set('Content-Type','application/json').set('Accept','application/json');
    return this.http.get<any>(endpoint,{headers});
  }
}
