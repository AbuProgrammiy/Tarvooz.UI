import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<any>{
    return this.httpClient.get(`${environment.baseURL}Product/GetAll`)
  }

  create(body:any):Observable<any>{
    return this.httpClient.post(`${environment.baseURL}Product/Create`,body)
  }
}
