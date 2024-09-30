import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  constructor(){
    setInterval(()=>{
      this.configureUserRole()
    },1000)
  }

  isUserSuperAdmin!: boolean

  configureUserRole(){
    if(typeof localStorage !== 'undefined'){
      if(localStorage.getItem("accessToken")!=null){
        this.isUserSuperAdmin=(jwtDecode(localStorage.getItem('accessToken')!)as any).Role=="SuperAdmin"
        return
      }
    }
    this.isUserSuperAdmin=false
  }
}
