import { Component, EventEmitter, Output } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Output() giveCategoryName = new EventEmitter()
  @Output() giveSearchPattern = new EventEmitter()

  constructor(private categoryService: CategoryService, private messageService: MessageService, private router: Router) {
    this.getAllCategory()
  }

  isUserRegistered: boolean = (typeof localStorage !== 'undefined') ? (localStorage.getItem("isUserRegistered") == "true") : false
  categories!: any
  searchPattern!:string

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

  chooseCategory(categoryName: any) {
    this.giveCategoryName.emit(categoryName)
  }

  exportSearchPattern(){
    this.giveSearchPattern.emit(this.searchPattern)
  }
}
