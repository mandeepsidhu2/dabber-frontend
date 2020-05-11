import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.css']
})
export class InteractiveComponent implements OnInit {

  constructor(private songService:SongService,private sanitizer:DomSanitizer,) { }
  songs:Array<any>=[]
  currentSongIndex:number;
  currentSong:SafeResourceUrl=null;
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
