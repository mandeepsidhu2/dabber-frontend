import { Component, OnInit, Renderer2, ViewChild, ElementRef, Input  } from '@angular/core';
import { SongService } from '../song.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { ChatService } from '../chat.service';
import { NotifierService } from "angular-notifier";
import {DataToInterService} from '../data-to-inter.service'
@Component({
  selector: 'app-interactive',
  templateUrl: './interactive.component.html',
  styleUrls: ['./interactive.component.css']
})
export class InteractiveComponent implements OnInit {
  @ViewChild('chathistory') div: ElementRef;
  @Input() name: string;
  userId:any;

  constructor(private dataToInterService:DataToInterService,private notifierService: NotifierService,private chatService: ChatService,private renderer: Renderer2,private songService:SongService,private sanitizer:DomSanitizer,) { 
    this.dataToInterService.getOldChat$.subscribe(data => {
      this.signalFromHomepage();
    })
    this.notifier = notifierService;
  }
  songs:Array<any>=[]
  faPaperPlane=faPaperPlane;
  currentSongIndex:number;
  currentSong:SafeResourceUrl=null;
  message:any
  loggedIn:boolean=false;
  private readonly notifier: NotifierService;
  chatWindowWidth='50vw'
  displayWarning(){
    if(!this.loggedIn)
    this.notifier.notify("error", "Login to chat ! ");
  }

  sendMessage(event:any) {
    if(event!=null && event.keyCode!=13)
     return;
    if(this.message==null||this.message=="")
    return
    this.chatService.addMessageToChatHistory(this.userId,this.name,this.message).subscribe(data=>{})
    this.chatService.sendMessage([this.name,this.message]);
    this.message = '';

  }
  
  signalFromHomepage(){
    if(localStorage.getItem(btoa("loggedIn"))==btoa("true"))
    this.loggedIn=true;
    document.getElementsByClassName("chatHistory")[0].innerHTML=""
    this.chatService.getAllChat().subscribe(data=>{
      this.addOldChat(data);
    })
  }
  connection
  ngOnInit(): void {
    this.chatWindowWidth=(window.innerWidth<= 400)? "100vw" : "50vw"
    this.userId=atob(localStorage.getItem(btoa("userId")))
    this.userId=Number(this.userId)
    if(localStorage.getItem(btoa("loggedIn"))==btoa("true"))
      this.loggedIn=true;
    else
      this.loggedIn=false;  

    this.connection=this.chatService.getMessages().subscribe(data => {
        this.addToChat(data);
      });
    this.chatService.getAllChat().subscribe(data=>{
      this.addOldChat(data);
    })
    this.songService.getAllData().subscribe(data=>{
      for(let i=0;i<data.length;i++)
      this.songs.push(data[i])     
      this.currentSongIndex=0
      this.currentSong=this.sanitizer.bypassSecurityTrustResourceUrl(this.songs[this.currentSongIndex].link)
    })
  }
  addOldChat(chatHistory:any){
   
    for(let i=0;i<chatHistory.length;i++){
      let data=[]
      data.push(chatHistory[i]['name'])
      data.push(chatHistory[i]['message'])
      this.addToChat(data);
    }
  }
  addToChat(data:any){
    if(data[0]==this.name)
    data="You: "+data[1];
    else
    data=data[0]+": "+data[1];
    const p: HTMLParagraphElement = this.renderer.createElement('p');
    p.innerHTML = String(this.linkify(data));
    this.renderer.appendChild(this.div.nativeElement, p)
    this.div.nativeElement.scrollTop=this.div.nativeElement.scrollHeight;
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
  private linkify(plainText): string{
    let replacedText;
    let replacePattern1;
    let replacePattern2;
    let replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = plainText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}

}
