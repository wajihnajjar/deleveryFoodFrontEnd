import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CommonService } from '../CommonService';
import {GlobalVars} from '../global-variable';
import { Router ,Navigation} from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent  {
// Take The Id That Provided in the url get request then disable all input 
// and put all the things 
constructor(private Service: CommonService,private router: Router
  ) {};
isDisabled = false;
Order: any[]=[];
arr : any
id =0
food =""
Arr =[{
firstName:"" , 
lastName:"" , 
email:"" ,
phoneNumber: ""
}]
res : any[]=[]
meals : any[] = []
count : any[]=[]
sum : any = 0 
map1 = new Map() ; 
 map = new Map() ; 
comment :String  = "" ; 

async ngOnInit()
{

  let token = localStorage.getItem("token")
  if(token==undefined){
    this.router.navigate(["/Login"])
    return 
  }
  let prv = localStorage.getItem("meals")?.split("\n") || []
  for (let i = 0 ; i< prv.length ;i ++){
    if(this.map.get(prv[i])==undefined){
      this.map.set(prv[i],1)
    }
    else {
      this.map.set(prv[i],this.map.get(prv[i])+1)
    }  
  }
  for(let pair of this.map){
    this.meals.push(pair[0])
    this.count.push(pair[1])
  }
  let prices = localStorage.getItem("price")?.split("\n") ||[] ; 
  for (let i = 0 ;i< prices.length ; i ++){
    let name = prices[i].split(":")[0]
    let price = Number(prices[i].split(":")[1])
    if(this.map1.get(name)==undefined){
      this.map1.set(name,price)
    }  
  }
  for (let i of this.map1){
    console.log(i)
  }
  for (let i of this.map){
    console.log(i , " " , this.map1.get(i[0])*i[1] , " " , i[1])
    this.sum+=(this.map1.get(i[0])*i[1]||0)
  }

  await axios.post("http://localhost:4001/getUserInfo",{
  token:localStorage.getItem("token")
}).then(res=>{
  this.Arr=(res.data)
})

}
changeStyle(){
  if(this.sum==0)
    return {'display' : 'none'}
  else 
    return  {'display' : 'block'}
  
}
changeCount(event:any){
  event.preventDefault()
    let operation = event.target.outerText
    let index = Number(event.target.parentElement.id)
    console.log(index)
    if(operation=="+"){
      this.count[index]+=1
      this.sum+=this.map1.get(this.meals[index])
    }
    else {
      this.count[index]=  Math.max(this.count[index]-1,0)
      this.sum =0 
      for (let i=0 ; i< this.meals.length; i ++){
        this.sum+=this.map1.get(this.meals[i])*this.count[i]
      } 
    }
  }

  getComment(event:any){
    this.comment=(event.target.value)


  }

 async orderNow(event:any){
    event.preventDefault()
    localStorage.removeItem("meals")
    localStorage.removeItem("price")
    GlobalVars.counter=0
    this.Service.sendUpdate({counter:0});
    let orders = "" ; 
    for (let i of this.map ) {
      if(i[1]>0)
      orders += i[0]+":"+i[1] +"||"; 
    }
    
    orders+=this.sum
      axios.post("http://localhost:4001/addOrder",{
        token : localStorage.getItem("token") , 
        comment: this.comment, 
        order : orders
       })
    this.router.navigate(["/Home"])

  }

}