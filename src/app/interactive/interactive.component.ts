import { Component, OnInit, Renderer2, ViewChild, ElementRef, Input  } from '@angular/core';
import { SongService } from '../song.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.css']
})
export class InteractiveComponent implements OnInit {
  @ViewChild('chathistory') div: ElementRef;
  @Input() name: string;
  constructor(private renderer: Renderer2,private songService:SongService,private sanitizer:DomSanitizer,) { }
  songs:Array<any>=[]
  faPaperPlane=faPaperPlane;
  currentSongIndex:number;
  currentSong:SafeResourceUrl=null;
  message:any
  addElement(event:any) {
    console.log(this.name)
    if(event!=null && event.keyCode!=13)
     return;
    const p: HTMLParagraphElement = this.renderer.createElement('p');
    p.innerHTML = this.name+": "+this.message;
    this.message=null
    this.renderer.appendChild(this.div.nativeElement, p)
    this.div.nativeElement.scrollTop=this.div.nativeElement.scrollHeight;
  }

  ngOnInit(): void {
    this.songService.getAllData().subscribe(data=>{
      for(let i=0;i<data.length;i++)
      this.songs.push(data[i])     
      this.currentSongIndex=0
      this.currentSong=this.sanitizer.bypassSecurityTrustResourceUrl(this.songs[this.currentSongIndex].link)
    })
  }
 
  nextSong(){
    this.currentSongIndex=(this.currentSongIndex+1)%(this.songs.length)
    this.currentSong=this.sanitizer.bypassSecurityTrustResourceUrl(this.songs[this.currentSongIndex].link)
    console.log("Current index is " + this.currentSongIndex)
  }
  previousSong(){
    if(this.currentSongIndex > 0)
    this.currentSongIndex=(this.currentSongIndex-1)
    this.currentSong=this.sanitizer.bypassSecurityTrustResourceUrl(this.songs[this.currentSongIndex].link)

  }

}
