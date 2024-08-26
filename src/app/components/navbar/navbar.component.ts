import { Component } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private categoryService:CategoryService, private messageService:MessageService){
    this.getAllCategory()
  }
  
  categories!:any

  getAllCategory(){
    this.categoryService.getAll().subscribe({
      next:(response)=>{
        this.categories=response
      },
      error:(err)=>{
        this.messageService.add({ severity: 'error', summary: 'Xato', detail: 'Nimadir xato ketdi!' });
      }
    })
  }
}
