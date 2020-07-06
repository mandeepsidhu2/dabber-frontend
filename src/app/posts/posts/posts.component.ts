import { Component, OnInit } from '@angular/core';
import { faShieldAlt,faHandPaper,faHandRock } from '@fortawesome/free-solid-svg-icons';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  durationInSeconds = 5;
  constructor(private _snackBar: MatSnackBar) {}
  openSnackBar() {
    this._snackBar.openFromComponent(TabbedSnackbar, {
      duration: this.durationInSeconds * 1000,
    });
  }
  faShieldAlt=faShieldAlt;
  faHandPaper=faHandPaper;
  faHandRock=faHandRock;
  writingPost:Boolean=false;
  ngOnInit(): void {
  }
  createPost(){

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
