import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router ,Navigation} from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LoginCommonService } from '../LoginCommonService';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: String = '';
  password :String= '';
  nav : any 
  constructor(
    private deviceService: DeviceDetectorService,
    private router: Router ,
    private Service1 : LoginCommonService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     this.nav= this.router.getCurrentNavigation()


  }
  GetDataEmail(event: any) {
    this.email = event.target.value;
  }
  GetDataPassword(event: any) {
    this.password = event.target.value;
  }
  
  async GetDataFromDataBase(event: any) {

    await axios
      .post('http://localhost:4001/login', {
        email: this.email,
        password: this.password,
      })
      .then( async ({data}) => {
        //alert(data.data);
         localStorage.setItem("token",data.token)
       // location.reload()
        this.Service1.sendUpdate({
          state : 0
        })
       await this.router.navigate(["/Login"])
        await this.router.navigate(["/Home"])
       
      })
      .catch((err) => console.log(JSON.stringify(err)));
    

    // if( you get nice redirect him to home compoenent)
    // redirect him to same page
    //http://localhost:5000/user/loginUser For login
    /*
    loginEmail  , 
    loginPassword
      
    
    */
  }
}
