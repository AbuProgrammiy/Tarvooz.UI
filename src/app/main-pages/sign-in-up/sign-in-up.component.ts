import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in-up',
  templateUrl: './sign-in-up.component.html',
  styleUrl: './sign-in-up.component.scss'
})
export class SignInUpComponent {
  constructor(private userService: UserService, private messageService: MessageService) { }

  firstName!: string
  lastName!: string
  email!: string
  password!: string

  sendVerification() {
    const body = {
      email: this.email,
    }

    this.userService.sendVerification(body).subscribe({
      next: (response) => {
        if(response.isSuccess){
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Verification is sent' });
        }
        else{
          this.messageService.add({ severity: 'Warning', summary: 'Warn', detail: response.response });
        }
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    })
  }
}
