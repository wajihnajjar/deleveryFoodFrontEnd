import { Component,ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonService } from './CommonService';
import { Router } from '@angular/router';
import {LoginCommonService} from "./LoginCommonService"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  count: any = 0 ;
  state : any = localStorage.getItem("token")==undefined ? 1 : 0   ; 
  constructor(
    private Service: CommonService ,
    private elementRef :ElementRef, 
    private router: Router , 
    private Service1 : LoginCommonService
    
  ) {
     this.Service.getUpdate().subscribe
     (x => { 
      console.log(x["text"].counter)
     this.count = x["text"].counter;
     });  
     this.Service1.getUpdate().subscribe
     (x => {
        this.state=(x["text"].state)
       
      })
  
    }
  ngOnInit(){    
  }
  async Logout(event:any){
    this.state=1
    localStorage.removeItem("token")
    await this.router.navigate(["/Login"])
  }

}
