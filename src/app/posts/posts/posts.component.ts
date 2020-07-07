import { Component, OnInit } from '@angular/core';
import { faShieldAlt,faHandPaper,faHandRock } from '@fortawesome/free-solid-svg-icons';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  durationInSeconds = 5;
  private readonly notifier: NotifierService;
  constructor(private notifierService: NotifierService,private _snackBar: MatSnackBar,private postService:PostService) 
  {
    this.notifier = notifierService;
  }
  openSnackBar() {
    this._snackBar.openFromComponent(TabbedSnackbar, {
      duration: this.durationInSeconds * 1000,
    });
  }
  faShieldAlt=faShieldAlt;
  faHandPaper=faHandPaper;
  faHandRock=faHandRock;
  writingPost:Boolean=false;
  posts:Array<any>;
  postTitle= new FormControl();
  postContent= new FormControl();
  connection
  ngOnInit(): void {
    this.postService.getPosts().subscribe(posts=>{
      this.posts=posts;
      console.log(this.posts)
    })
    this.connection=this.postService.getPostsRealTime().subscribe(
      data=>{
        let post={
          title:data[0].title,
          content:data[0].content,
          username:data[1].name,
          picture_url:data[1].photoUrl
        }
        this.posts.unshift(post)
      }
      )
  }
  ngOnDestroy() {
    this.connection.unsubscribe();
  }
  createPost(){
    let post={
      "title":this.postTitle.value,
      "content":this.postContent.value
    }
    this.postService.createPost(post).subscribe(data=>{
      this.writingPost=false;
      this.notifierService.notify("success","Post Created !")
    })
    this.postService.sendPost([post,JSON.parse(localStorage.getItem('user'))]);
  }
  writePost(){
    this.writingPost=true;
  }
  cancelWritePost(){
    this.writingPost=false;
  }
}


@Component({
  selector: 'tabbed-snackbar',
  template: `
  <span class="post-tab">
       Post Tabbed! 🍕
  </span>
  `,
  styles: [`
  .post-tab {
    color: hotpink;
  }
`],
})
export class TabbedSnackbar {

}