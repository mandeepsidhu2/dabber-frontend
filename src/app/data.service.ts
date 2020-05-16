import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
@Injectable()
export class DataService {

  private userDataSource = new Subject<string>();;
  userData$ = this.userDataSource.asObservable();
  sendData(data: string) {
    this.userDataSource.next(data);
  }
 
  
}
