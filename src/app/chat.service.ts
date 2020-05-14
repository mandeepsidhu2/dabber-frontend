import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket){}
  public sendMessage(message) {
    console.log("sending to node server "+ message)
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
}
