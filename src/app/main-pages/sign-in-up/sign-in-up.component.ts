import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.component.html',
  styleUrl: './sign-in-up.component.scss'
})
export class SignInUpComponent {
  constructor(private userService: UserService,private router:Router, private messageService: MessageService) { }

  firstName!: string
  lastName!: string
  email!: string
  password!: string
  sentPassword!:string

  currentMode:string="Register"
  isLoading:boolean=false

  directCommand(){
      switch (this.currentMode){
        case "Register":
          this.sendVerification()
          break
        case "VerifyEmail":
          this.register()
          break
        case "LogIn":
          this.logIn()
          break
      }
  }

  back(){
    this.currentMode="Register"
  }

  changeOption(){
    switch(this.currentMode){
      case "Register":
        this.currentMode="LogIn"
        break
      case "LogIn":
        this.currentMode="Register"
        break
    }
  }

  sendVerification() {
    this.isLoading=true
    
    const body = {
      email: this.email,
    }

    this.userService.sendVerification(body).subscribe({
      next: (response) => {
        if(response.isSuccess){
          this.currentMode="VerifyEmail"
          this.messageService.add({ severity: 'success', summary: 'Muvaffaqiyat', detail: response.response });
        }
        else{
          this.messageService.add({ severity: 'warn', summary: 'Ogohlantirish', detail: response.response });
        }
        this.isLoading=false
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Xato', detail: 'Nimadir xato ketdi!' });
        this.isLoading=false
      }
    })
  }

  register(){
    this.isLoading=true

    const body = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      sentPassword: this.sentPassword,
    }

    this.userService.register(body).subscribe({
      next:(response)=>{
        if(response.isSuccess){
          localStorage.setItem("accessToken",response.response)
          localStorage.setItem("isUserRegistered","true")
          this.router.navigate([""])
          this.messageService.add({ severity: 'success', summary: 'Muvaffaqiyat', detail: "Siz ro'yxattan o'tdingiz" });
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
  
  logIn(){
    this.isLoading=true

    const body = {
      email: this.email,
      password: this.password
    }

    this.userService.logIn(body).subscribe({
      next:(response)=>{
        if(response.isSuccess){
          localStorage.setItem("accessToken",response.response)
          localStorage.setItem("isUserRegistered","true")
          this.router.navigate([""])
          this.messageService.add({ severity: 'success', summary: 'Muvaffaqiyat', detail: "Siz akkauntingiz kirdingiz" });
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
