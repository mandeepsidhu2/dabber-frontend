import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }
  breakpoint:string="5:1"
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  ngOnInit(): void {
    console.log("in about")
  }
  onResize(event){
    this.breakpoint=(event.target.innerWidth <= 400)? "1:1.4" : "5:1"
  }

}
