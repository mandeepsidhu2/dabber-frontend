import { Component, OnInit } from '@angular/core';

import {animate, state, style, transition, trigger} from '@angular/animations';
import { LevelService } from '../level.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HomepageComponent implements OnInit {
  public now: Date = new Date();
  userData:any;
  loggedIn:Boolean=false
  
  var:Array<any>;
  ELEMENT_DATA:totalRecord[]=[]
  graphCollect:Array<any>=[];
  
  dataSource:any;
  columnsToDisplay = ['name', 'easy', 'medium', 'hard'];
  expandedElement: totalRecord | null;
  
  ngOnInit(): void {
    
    this.levelService.getUserData().subscribe(data=>{
      this.userData=data["user"];
      if(localStorage.getItem(btoa("loggedIn"))==btoa("true"))
      this.loggedIn=true;
      else
      this.loggedIn=false;  
    })
  
    this.levelService.getAllData().subscribe(data=>{
      this.fillData(data)
    
    })
  }
  fillData(data:any){
      this.var=data;
      console.log(data)
      for(let i=0;i<this.var.length;i++){
        let dataGraph:any[]=[]
        var xEasy=this.var[i]['easy']
        var xMedium=this.var[i]['medium']
        var xDifficult=this.var[i]['difficult']
        for(let i=0;i<xEasy.length;i++){
          let xE=JSON.parse(xEasy[i])
          let xM=JSON.parse(xMedium[i])
          let xD=JSON.parse(xDifficult[i])
          var element:dataPoint={date:null,easy:null,medium:null,difficult:null}
          element.date=xE[0]['time']
          element.easy=xE[0]['completed']
          element.medium=xM[0]['completed']
          element.difficult=xD[0]['completed']
          let arr:Array<any>=[]
          arr.push(element.date)
          arr.push(element.easy)
          arr.push(element.medium)
          arr.push(element.difficult)
          dataGraph.push(arr)
        }
        this.graphCollect.push(dataGraph)
        //console.log(x[0]['time'])
      }
      console.log(this.graphCollect[0])

      this.var=data;
      for(let i=0;i<this.var.length;i++){
        var temp:totalRecord= {name:null,easy:null,medium:null,hard:null};
        temp.name=this.var[i]['name'];
       temp.easy=this.var[i]['totalEasy'];
        temp.medium=this.var[i]['totalMedium'];
        temp.hard=this.var[i]['totalDifficult'];
       this.ELEMENT_DATA.push(temp)
     }
     this.dataSource=this.ELEMENT_DATA;
  }
  constructor(private levelService:LevelService) { 
    setInterval(() => {
      this.now = new Date();
      
    }, 1);
  }
  increaseLevels( level:string){
    
    this.userData[level]=this.userData[level]+1
    this.levelService.changeLevel(level,this.userData[level]).subscribe(data=>{
      console.log(data);
    })
  }
  decreaseLevels(level:string){
    if(this.userData[level]>0){
    this.userData[level]=this.userData[level]-1
    }
    this.levelService.changeLevel(level,this.userData[level]).subscribe(data=>{
      console.log(data);
    })
  }
  title = 'Coding Practice Progress';
   type = 'LineChart';
   columnNames = ["Date","easy", "medium", "hard"];
   options = {   
      hAxis: {
         title: 'Date'
      },
      vAxis:{
         title: 'Problems Solved'
      },
      colors:["#66ff66","#ffff00","#ff0000"]
   };
   width = 700;
   height = 300;

  
 
 
  
}

export interface totalRecord {
  name: string;
  hard: number;
  easy: number;
  medium: number;
}
export interface dataPoint{
  date: string;
  easy:number;
  medium:number;
  difficult:number;
}

