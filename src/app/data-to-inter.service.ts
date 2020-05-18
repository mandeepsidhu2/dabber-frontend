import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataToInterService {

  private getOldChatSource = new Subject<string>();;
  getOldChat$ = this.getOldChatSource.asObservable();
  sendData(data: string) {
    this.getOldChatSource.next(data);
  }
 
}
