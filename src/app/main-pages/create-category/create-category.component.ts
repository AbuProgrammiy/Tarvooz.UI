import { Component } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent {

  constructor(private categoryService:CategoryService,private messageService:MessageService){}

  name!:string

  isLoading:boolean=false

  createCategory(){
    this.isLoading=true

    const body={
      name:this.name
    }

    this.categoryService.create(body).subscribe({
      next:(response)=>{
        if(response.isSuccess){
          this.messageService.add({ severity: 'success', summary: 'Muvaffaqiyat', detail: response.response });
        }
        else{
          this.messageService.add({ severity: 'warn', summary: 'Ogohlantirish', detail: response.response });
        }
        this.isLoading=false
      },
      error:(err)=>{
        this.messageService.add({ severity: 'error', summary: 'Xato', detail: 'Nimadir xato ketdi!' });
        this.isLoading=false
      }
    })
  }
}
