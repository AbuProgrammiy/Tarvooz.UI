import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  isUserSuperAdmin: boolean = (jwtDecode((typeof localStorage!=="undefined")?localStorage.getItem("accessToken")!:"")as any).Role=="SuperAdmin"
}
