import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import axios from 'axios';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  image_post: any;
  stars:any ; 
  Rate : number = 0 ;
  feedback : String ="";
   getFeedback(event:any){
     this.feedback = event.target.value
  }
  constructor(private router: Router){}

 async addReview(event:any){
    event.preventDefault()
    this.stars =document.getElementsByClassName("rating")[0].children
    for (let i = 0 , j =1 ; i< this.stars.length ; i +=2 ,j++){
      if(this.stars[i]["checked"]==true){
          this.Rate=Math.floor(this.stars.length/2)-j+1;
          break
      }
    }
    await axios.post("http://localhost:4001/addReview",{
      token : localStorage.getItem("token") , 
      Rate: this.Rate  , 
      feedback: this.feedback

    }).then(({data})=>{
      alert(data)
    }).catch(err=>{
      console.log(err)
    })
  }
  ngOnInit(): void {
    let token = localStorage.getItem("token")
    if(token==undefined){
      this.router.navigate(["/Login"])
      return 
    }
  }





}
