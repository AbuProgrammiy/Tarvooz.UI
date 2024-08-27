import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { MessageService } from 'primeng/api';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private productService:ProductService,private messageService:MessageService){
    this.getAllProducts()
  }

  products!:any
  baseImageUrl:string=environment.baseImageURL

  isLoading:boolean=true

  getAllProducts(){
    this.productService.getAll().subscribe({
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
