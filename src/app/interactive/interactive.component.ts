import { Component, OnInit, Renderer2, ViewChild, ElementRef, Input  } from '@angular/core';
import { SongService } from '../song.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.css']
})
export class InteractiveComponent implements OnInit {
  @ViewChild('chathistory') div: ElementRef;
  @Input() name: string;
  constructor(private chatService: ChatService,private renderer: Renderer2,private songService:SongService,private sanitizer:DomSanitizer,) { }
  songs:Array<any>=[]
  faPaperPlane=faPaperPlane;
  currentSongIndex:number;
  currentSong:SafeResourceUrl=null;
  message:any

  
  sendMessage(event:any) {
    if(event!=null && event.keyCode!=13)
     return;
    this.chatService.sendMessage([this.name,this.message]);
    this.message = '';

  }
  connection
  ngOnInit(): void {
    this.connection=this.chatService.getMessages().subscribe(data => {
        console.log("message recieved "+ data[0],this.name)
        if(data[0]==this.name)
          data="You: "+data[1];
        else
          data=data[0]+": "+data[1];
        const p: HTMLParagraphElement = this.renderer.createElement('p');
        p.innerHTML = String(data);
        this.renderer.appendChild(this.div.nativeElement, p)
        this.div.nativeElement.scrollTop=this.div.nativeElement.scrollHeight;
      });
    this.songService.getAllData().subscribe(data=>{
      for(let i=0;i<data.length;i++)
      this.songs.push(data[i])     
      this.currentSongIndex=0
      this.currentSong=this.sanitizer.bypassSecurityTrustResourceUrl(this.songs[this.currentSongIndex].link)
    })
  }
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
  nextSong(){
    this.currentSongIndex=(this.currentSongIndex+1)%(this.songs.length)
    this.currentSong=this.sanitizer.bypassSecurityTrustResourceUrl(this.songs[this.currentSongIndex].link)
  }
  previousSong(){
    if(this.currentSongIndex > 0)
    this.currentSongIndex=(this.currentSongIndex-1)
    this.currentSong=this.sanitizer.bypassSecurityTrustResourceUrl(this.songs[this.currentSongIndex].link)

  }

}
