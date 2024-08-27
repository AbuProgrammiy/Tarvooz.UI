import { Component, EventEmitter, Output } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Output() giveCategoryName=new EventEmitter()

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

  chooseCategory(name:any){
    console.log(name);
    this.giveCategoryName.emit(name)
  }
}
