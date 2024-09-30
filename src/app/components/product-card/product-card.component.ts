import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ProductService } from '../../services/product/product.service';
import { MessageService } from 'primeng/api';
import { jwtDecode } from 'jwt-decode';
import { BasketService } from '../../services/basket/basket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() products!: any
  @Input() cardStatus!: string

  constructor(private router:Router,private basketService:BasketService,private productService: ProductService, private messageService: MessageService) { }

  baseImageUrl: string = environment.baseImageURL

  deleteProduct(id: string) {

    document.getElementById("delete-"+id)!.innerHTML = `<div class="spinner-border spinner-border-sm" role="status">
                                                          <span class="visually-hidden">Loading...</span>
                                                        </div>`

    this.productService.delete(id).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Ogohlatrish', detail: response.response });
          document.getElementById(`card-${id}`)!.innerHTML=""
        }
        else {
          this.messageService.add({ severity: 'warn', summary: 'Ogohlatrish', detail: response.response });
        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Xato', detail: 'Nimadir xato ketdi!' });
      }
    })
  }

  createBasket(productId:string){

    if(typeof localStorage !=="undefined"){
      if(localStorage.getItem("isUserRegistered")!="true"){
        this.router.navigate([""])
      }
    }

    const body={
      userId:(jwtDecode(localStorage.getItem("accessToken")!)as any).Id,
      productId:productId
    }

    document.getElementById("create-"+productId)!.innerHTML=`<div class="spinner-border spinner-border-sm" role="status">
                                                              <span class="visually-hidden">Loading...</span>
                                                            </div>`

    this.basketService.create(body).subscribe({
      next:(response)=>{
        if(response.isSuccess){
          this.messageService.add({ severity: 'success', summary: 'Muvaffaqiyat', detail: response.response });
        }
        else{
          this.messageService.add({ severity: 'warn', summary: 'Ogohlantrish', detail: response.response });
        }
        document.getElementById("create-"+productId)!.innerHTML="Savatga qo'shish"
      },
      error:(err)=>{
        this.messageService.add({ severity: 'error', summary: 'Xato', detail: 'Nimadir xato ketdi!' });
        document.getElementById("create-"+productId)!.innerHTML="Savatga qo'shish"
      }
    })
  }
}
