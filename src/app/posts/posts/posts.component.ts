import { Component, OnInit } from '@angular/core';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  ngOnInit(): void {
  }

}

@Component({
  selector: 'tabbed-snackbar',
  templateUrl: 'tabbed-snackbar.html',
  styles: [`
  .post-tab {
    color: hotpink;
  }
`],
})
export class TabbedSnackbar {

}
