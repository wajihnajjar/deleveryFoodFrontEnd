import { Component, OnInit } from '@angular/core';
import {GlobalVars} from '../global-variable';
import { CommonService } from '../CommonService';
import { Router ,Navigation} from '@angular/router';

import axios from 'axios'
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
Data : any[]= []

//Add Descr in the menu schema
//Modify the rating means foor loop for avg score 
// then add start as many as you want 

constructor(private Service: CommonService,  private router: Router) { }

  getScoreOfType(mealType : any){
    console.log(mealType)
    const types = ["third" , "second" , "first"]
    return (types.lastIndexOf(mealType)+1)*100000
  }

   ngOnInit(){ 
  let token = localStorage.getItem("token")
  if(token==undefined){
    this.router.navigate(["/Login"])
    return 
  }
       axios.post("http://localhost:4001/getAllfood",{
        token:localStorage.getItem("token")
      }).then(({data})=>{
          this.Data=data
          let This = this 
          this.Data.sort(function(a:any,b:any):number{
           let scoreA = a.click +(This.getScoreOfType(a.food_type))
           let scoreB = b.click + (This.getScoreOfType(b.food_type))
           return scoreB-scoreA

          })
      }).catch(err=>{
        console.log(err)
      })

 
  }
  addToCard(event:any){
          event.preventDefault()
          GlobalVars.counter=GlobalVars.counter+1
          this.Service.sendUpdate({ 
            counter : GlobalVars.counter , 
          });
          let foodName = event.target.parentElement.children[2].outerText
          let price=(event.target.parentElement.children[0].outerText)
          if(localStorage.getItem("meals")==null)
           {
            localStorage.setItem("price",foodName+":"+price)
            localStorage.setItem("meals",foodName)
           }
           else {
            let  previous = localStorage.getItem("meals")
            let previous1 = localStorage.getItem("price")
            previous1+="\n"+foodName+":"+price
            previous+="\n"+foodName
            localStorage.setItem("meals",`${previous}`)
            localStorage.setItem("price",`${previous1}`)
           }
          axios.post("http://localhost:4001/addClick",{
            token:localStorage.getItem("token")  , 
            food_name:foodName
          }).then(({data})=>{
            
          }).catch((err)=>{
            console.log(err)
          })
  }

}
