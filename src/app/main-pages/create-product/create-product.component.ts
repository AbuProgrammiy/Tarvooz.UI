import { Component } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { MessageService } from 'primeng/api';
import { jwtDecode } from 'jwt-decode';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  value: any;

  constructor(private categoryService: CategoryService, private productService: ProductService, private messageService: MessageService) {
    this.getAllCategory()
  }

  name!: string
  description!: string
  price!: number
  category!: string
  categories!: any
  path!: string
  image!: File

  isLoading: boolean = false
  isImageSelected: boolean = false

  getImage(event: any) {
    this.image = event.target.files[0];
    let reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])
    reader.onload = (e: any) => {
      this.path = e.target.result
    }
    this.isImageSelected = true
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe({
      next: (response) => {
        this.categories = response
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Xato', detail: 'Nimadir xato ketdi!' });
      }
    })
  }

  createProduct() {
    this.isLoading = true
    let categoryId

    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i]["name"] == this.category) {
        categoryId = this.categories[i]["id"]
        break
      }
    }

    let formData = new FormData()

    formData.append("name", this.name)
    formData.append("description", this.description)
    formData.append("price", this.price.toString())
    formData.append("categoryId", categoryId)
    formData.append("userId", (jwtDecode(localStorage.getItem("accessToken")!) as any).Id)
    formData.append("Image", this.image)

    this.productService.create(formData).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.messageService.add({ severity: 'success', summary: 'Muvaffaqiyat', detail: response.response });
        }
        else {
          this.messageService.add({ severity: 'warn', summary: 'Ogohlantirish', detail: response.response });
        }
        this.isLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Xato', detail: 'Nimadir xato ketdi!' });
        this.isLoading = false
      }
    })
  }
}
