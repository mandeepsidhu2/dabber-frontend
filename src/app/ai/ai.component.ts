import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ai',
  templateUrl: './ai.component.html',
  styleUrls: ['./ai.component.css']
})
export class AiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.breakpoint1=(window.innerWidth <= 400)? "1:1.9" : "5:1"
    this.breakpoint2=(window.innerWidth <= 400)? "1:1" : "5:1"

  }
  breakpoint1:string="5:1"
  breakpoint2:string="5:1"



}
