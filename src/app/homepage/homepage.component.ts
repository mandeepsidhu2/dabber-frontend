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
  
  //for google line chart
  var:Array<any>;
  graphCollect:any=[];
  title = 'Coding Practice Progress';
  type = 'LineChart';
  columnNames = ["Date","easy", "medium", "difficult"];
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

  //for mat table
  dataSource:any;
  ELEMENT_DATA:totalRecord[]=[]
  columnsToDisplay = ['name', 'easy', 'medium', 'difficult'];
  expandedElement: totalRecord | null;
  
  ngOnInit(): void {
    if(localStorage.getItem(btoa("loggedIn"))==btoa("true"))
      this.loggedIn=true;
    else
      this.loggedIn=false;  

    this.levelService.getUserData().subscribe(data=>{
      this.userData=data["user"];    
    })
  
    this.levelService.getAllData().subscribe(data=>{
      this.fillData(data) 
      console.log(data)
    });
  }
  fillData(data:any){
      this.var=data;
      console.log(data)
      //go over each user
      for(let i=0;i<this.var.length;i++){
        let dataGraph:any[]=[]
        let xEasy=this.var[i]['easy']
        let xMedium=this.var[i]['medium']
        let xDifficult=this.var[i]['difficult']
      //go over the track records of easy medium difficult of each user
        for(let i=0;i<xEasy.length;i++){
          let xE=JSON.parse(xEasy[i])
          let xM=JSON.parse(xMedium[i])
          let xD=JSON.parse(xDifficult[i])
          let arr:Array<any>=[]
          arr.push(xE[0]['time'])
          arr.push(xE[0]['completed'])
          arr.push(xM[0]['completed'])
          arr.push(xD[0]['completed'])
          dataGraph.push(arr)
        }
        //push the data into the graph collection of all the users
        this.graphCollect[this.var[i]['email']]=dataGraph
      
      }

      //setting up the data for mat table
      this.var=data;
      for(let i=0;i<this.var.length;i++){
        var temp:totalRecord= {name:null,email:null,easy:null,medium:null,difficult:null};
        temp.name=this.var[i]['name'];
        temp.easy=this.var[i]['totalEasy'];
        temp.medium=this.var[i]['totalMedium'];
        temp.difficult=this.var[i]['totalDifficult'];
        temp.email=this.var[i]['email']
        this.ELEMENT_DATA.push(temp)
     }
     //data source is read for the table
     this.dataSource=this.ELEMENT_DATA;
  }
  constructor(private levelService:LevelService) { 
    //for the live time on screen
    setInterval(() => {
      this.now = new Date();
      
    }, 1);
  }

  //increase the number of problems solved in each category
  increaseLevels( level:string,arg:number){ 
    //to update google chart live for the concerned user
    let size=this.graphCollect[this.userData.email].length
    this.graphCollect[this.userData.email][size-1][arg]=this.userData[level]+1;
    console.log(this.graphCollect[this.userData.email][size-1])
    //code to update chart ends here

    //to update the table live then hit the api
    let email=this.userData.email
    this.dataSource.filter(function(item){
       if(item["email"]==email){
         console.log(item)
        item[level]+=1;
    }})
    //code for live update ends
  
    //updating database,API hit
    this.userData[level]=this.userData[level]+1
    this.levelService.changeLevel(level,this.userData[level]).subscribe(data=>{
      console.log(data);
    })
  }

  //decrease the number of problems solved in each category
  decreaseLevels(level:string){
    if(this.userData[level]>0){
    this.userData[level]=this.userData[level]-1
    //to update the table live then hit the api
    let email=this.userData.email
    this.dataSource.filter(function(item){
       if(item["email"]==email){
         console.log(item)
        item[level]-=1;
    }})
    //code for live update ends

     //updating database,API hit
     this.levelService.changeLevel(level,this.userData[level]).subscribe(data=>{
      console.log(data);
    })

    } 
  }

  
}

export interface totalRecord {
  name: string;
  email: string;
  difficult: number;
  easy: number;
  medium: number;
}
