import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClient:HttpClient) { }

  getUserBaskets(userId:string):Observable<any>{
    return this.httpClient.get(`${environment.baseURL}Basket/GetUserBaskets/${userId}`)
  }

  create(body:any):Observable<any>{
    return this.httpClient.post(`${environment.baseURL}Basket/Create`,body)
  }
}
