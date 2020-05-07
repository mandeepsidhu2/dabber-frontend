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
      this.var=data
      
      console.log(data)
      for(let i=0;i<this.var.length;i++){
        var temp:totalRecord= {name:null,easy:null,medium:null,hard:null};
        temp.name=this.var[i]['name'];
       temp.easy=this.var[i]['totalEasy'];
        temp.medium=this.var[i]['totalMedium'];
        temp.hard=this.var[i]['totalDifficult'];
       this.ELEMENT_DATA.push(temp)
     }
     this.dataSource=this.ELEMENT_DATA;
      console.log(this.dataSource);
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
  title = 'Average Temperatures of Cities';
   type = 'LineChart';
   data = [
      ["Jan",  17.0, -0.2, -0.9, 3.9],
      ["Feb",  6.9, 0.8, 0.6, 4.2],
      ["Mar",  9.5,  5.7, 3.5, 5.7],
      ["Apr",  14.5, 11.3, 8.4, 8.5],
      ["May",  18.2, 17.0, 13.5, 11.9],
      ["Jun",  21.5, 22.0, 17.0, 15.2],
      ["Jul",  25.2, 24.8, 18.6, 17.0],
      ["Aug",  26.5, 24.1, 17.9, 16.6],
      ["Sep",  23.3, 20.1, 14.3, 14.2],
      ["Oct",  18.3, 14.1, 9.0, 10.3],
      ["Nov",  13.9,  8.6, 3.9, 6.6],
      ["Dec",  9.6,  2.5,  1.0, 4.8]
   ];
   columnNames = ["Month", "Tokyo", "New York","Berlin", "Paris"];
   options = {   
      hAxis: {
         title: 'Month'
      },
      vAxis:{
         title: 'Temperature'
      },
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

// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     hard: 1,
//     name: 'Hydrogen',
//     easy: 1.0079,
//     medium: 2
   
//   }, {
//     hard: 2,
//     name: 'Helium',
//     easy: 4.0026,
//     medium: 4,
//   }, {
//     hard: 3,
//     name: 'Lithium',
//     easy: 6.941,
//     medium: 5,
  
//   }, {
//     hard: 4,
//     name: 'Beryllium',
//     easy: 9.0122,
//     medium: 6,
//   }, {
//     hard: 5,
//     name: 'Boron',
//     easy: 10.811,
//     medium: 2,
   
//   }, {
//     hard: 6,
//     name: 'Carbon',
//     easy: 12.0107,
//     medium: 9,
  
//   }, {
//     hard: 7,
//     name: 'Nitrogen',
//     easy: 14.0067,
//     medium: 1,

//   }, {
//     hard: 8,
//     name: 'Oxygen',
//     easy: 15.9994,
//     medium: 4,
  
//   }, {
//     hard: 9,
//     name: 'Fluorine',
//     easy: 18.9984,
//     medium: 6,
   
//   }, {
//     hard: 10,
//     name: 'Neon',
//     easy: 20.1797,
//     medium: 9,
   
//   },
// ];
