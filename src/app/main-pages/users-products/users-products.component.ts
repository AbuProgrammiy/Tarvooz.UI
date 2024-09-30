import { Component } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { jwtDecode } from 'jwt-decode';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-users-products',
  templateUrl: './users-products.component.html',
  styleUrl: './users-products.component.scss'
})
export class UsersProductsComponent {

  constructor(private productService:ProductService, private messageService:MessageService){
    this.getUsersAllProducts()
  }

  isLoading:boolean=true
  products:any

  getUsersAllProducts(){
    let userId!:string
    if(typeof localStorage !=='undefined'){
      userId= (jwtDecode(localStorage.getItem("accessToken")!)as any).Id
    }
    this.productService.getUserAllPrudcts(userId).subscribe({
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
