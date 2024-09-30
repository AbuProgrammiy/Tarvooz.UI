import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { ProductService } from '../../services/product/product.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() products!: any
  @Input() canDelete!: boolean

  constructor(private productService: ProductService, private messageService: MessageService) { }

  baseImageUrl: string = environment.baseImageURL

  deleteProduct(id: string) {

    document.getElementById(id)!.innerHTML = `<div class="spinner-border spinner-border-sm" role="status">
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
}
