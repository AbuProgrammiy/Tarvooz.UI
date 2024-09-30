import { Component } from '@angular/core';
import { BasketService } from '../../services/basket/basket.service';
import { MessageService } from 'primeng/api';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  constructor(private basketService:BasketService,private messageService:MessageService){
    this.getUserBaskets()
   }

  isLoading:boolean=true
  products!:any
  
  getUserBaskets(){
    let userId!:string

    if(typeof localStorage!=="undefined"){
      userId=(jwtDecode(localStorage.getItem("accessToken")!)as any).Id
    }

    this.basketService.getUserBaskets(userId).subscribe({
      next:(response)=>{
        this.products=response
        this.isLoading=false
      },
      error:(err)=>{
        this.messageService.add({ severity: 'error', summary: 'Xato', detail: 'Nimadir xato ketdi!' });
        this.isLoading=false
      }
    })
  }
}
