import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductCategory } from '../entity/ProductCategory';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  private apiUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  public add(category:ProductCategory):Observable<ProductCategory>{
    return this.http.post<ProductCategory>(`${this.apiUrl}/ProductCategory/Add`,category);
  }

  public getAll():Observable<ProductCategory[]>{
    return this.http.get<ProductCategory[]>(this.apiUrl+"/ProductCategory/GetAll");
  }

  public getById(id:any):Observable<ProductCategory>{
    return this.http.get<ProductCategory>(this.apiUrl+"/ProductCategory/GetById/"+id);
  }
}
