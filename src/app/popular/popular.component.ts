import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CommonService } from '../CommonService';
import { Router ,Navigation} from '@angular/router';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {
    meals : any[] = []
    constructor (private Service: CommonService,    
       private router: Router
      ) {}

  ngOnInit() { 
    let token = localStorage.getItem("token")
  if(token==undefined){
    this.router.navigate(["/Login"])
    return 
  }
    axios.post("http://localhost:4001/getAllFood",{
      token : localStorage.getItem("token")
    }).then(({data})=>{
      this.meals = data 
      this.meals.sort(function(a:any,b:any):number {
        return b.click-a.click
      })
    })
    }
  // addOne to the Cart 
     AddOne(event:any){ 
        this.router.navigate(["/Gallery"])
      }
  }
  


