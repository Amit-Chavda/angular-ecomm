import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../entity/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  
  public addProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(`${this.apiUrl}/products/add`,product);
  }

  public addToCartProduct(userId:number,productId:number,qty:number):Observable<any>{
    return this.http.post<Product>(this.apiUrl+"/products/addtocart/"+userId+"/"+productId+"/"+qty,{});
  }

  public getAll():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl+"/products/getall");
  }

  public getAllByNameAndDescription(name:string):Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl+"/products/getall/"+name);
  }

  public getByCategoryId(categoryId:number):Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl+"/products/GetByCategoryId/"+categoryId);
  }
  
  public getById(id:any):Observable<Product>{
    return this.http.get<Product>(this.apiUrl+"/products/get/"+id);
  }


  public removeById(id:any):Observable<Product>{
    return this.http.delete<Product>(this.apiUrl+"/products/remove/"+id);
  }
  
  public updateUserById(product:Product):Observable<Product>{
    return this.http.put<Product>(this.apiUrl+"/products/update",product);
  }

  public uploadFile(formData:FormData):any{
    return this.http.post(`${this.apiUrl}/files/upload`,formData,{observe:'response'});
  }
  
  public getFileById(id:number):any{
    return this.http.get(`${this.apiUrl}/files/get/`+id);
  }

}
