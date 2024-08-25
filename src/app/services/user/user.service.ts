import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  sendVerification(body:any):Observable<any>{
    return this.httpClient.post(`${environment.baseURL}User/SendVerification`,body)
  }
  
  register(body:any):Observable<any>{
    return this.httpClient.post(`${environment.baseURL}User/Register`,body)
  }
  
  logIn(body:any):Observable<any>{
    return this.httpClient.post(`${environment.baseURL}User/LogIn`,body)
  }
}
