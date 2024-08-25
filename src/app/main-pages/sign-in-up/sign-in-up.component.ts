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

  sendVerification(event:Event) {
    event.preventDefault();

    const body = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    }
    this.userService.sendVerification(body).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    })
  }
}
