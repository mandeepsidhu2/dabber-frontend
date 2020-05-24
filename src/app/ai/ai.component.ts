import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ai',
  templateUrl: './ai.component.html',
  styleUrls: ['./ai.component.css']
})
export class AiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  breakpoint:string="5:1"

  onResize(event){
    this.breakpoint=(event.target.innerWidth <= 400)? "1:1.4" : "5:1"
  }

}
