import { Component, OnInit } from '@angular/core';
import axios from "axios"
import { Router } from '@angular/router';
import { DeviceDetectorService } from "ngx-device-detector";
@Component({
  selector: 'app-singnup',
  templateUrl: './singnup.component.html',
  styleUrls: ['./singnup.component.css']
})
export class SingnupComponent  {
  firstName :String = "" ;
  lastName:String = ""  ;   
  email : String = ""  ; 
password :String = "" ; 
phoneNumber :String =  "" 


  constructor(private router:Router) { 
  }


GetEmail(event:any){
this.email=event.target.value
}
Getpassword(event:any){ 
this.password= event.target.value

}
Getphone(event:any){ 
this.phoneNumber=event.target.value
}
getFirstName(event:any){ 
this.firstName = event.target.value
}
getLastName(event:any){
this.lastName=event.target.value
}
async SendData(event:any){ 
event.preventDefault()
await axios.post("http://localhost:4001/signUp",{
  firstName : this.firstName , 
  lastName: this.lastName ,
  email:  this.email , 
  password : this.password , 
  phoneNumber: this.phoneNumber , 
})
  .then(({data})=> {
    alert(data)
    })
    .catch(err=>{
      location.reload()
      console.log(err)
    })

}



}
