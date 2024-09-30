import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  firstName!:string
  lastName!:string
  email!:string

  constructor(private router:Router){
    this.assignData()
  }

  assignData(){
    if(typeof localStorage!=='undefined'){
      const decodedAccessToken=jwtDecode(localStorage.getItem("accessToken")!) as any

      this.firstName=decodedAccessToken.FirstName
      this.lastName=decodedAccessToken.LastName
      this.email=decodedAccessToken.Email
    }
  }

  loggOut(){
    if(typeof localStorage!=='undefined'){
      localStorage.removeItem("accessToken")
      localStorage.removeItem("isUserRegistered")

      this.router.navigate([""])
    }
  }
}
