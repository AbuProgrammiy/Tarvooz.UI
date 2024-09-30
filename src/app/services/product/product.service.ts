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

  getProdusctsByCategoryName(categoryName:string):Observable<any>{
    return this.httpClient.get(`${environment.baseURL}Product/GetProductsByCategoryName/${categoryName}`)
  }

  getUserAllPrudcts(userId:string):Observable<any>{
    return this.httpClient.get(`${environment.baseURL}Product/GetUserAllProducts/${userId}`)
  }

  getProductsBySearchPattern(searchPattern:string):Observable<any>{
    return this.httpClient.get(`${environment.baseURL}Product/GetProductsBySearchPattern/${searchPattern}`)
  }

  create(body:any):Observable<any>{
    return this.httpClient.post(`${environment.baseURL}Product/Create`,body)
  }
  
  delete(id:string):Observable<any>{
    return this.httpClient.delete(`${environment.baseURL}Product/Delete/${id}`)
  }
}
