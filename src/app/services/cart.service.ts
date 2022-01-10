import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cart } from '../entity/cart';
import { Product } from '../entity/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  
  public getCartByUserId(userId:number):Observable<cart>{
    return this.http.get<cart>(this.apiUrl+"/cart/get/"+userId);
  }
  
  public updateCartByUserId(userId:number,cart:cart):Observable<cart>{
    return this.http.put<cart>(this.apiUrl+"/cart/update/"+userId,cart);
  }


}
