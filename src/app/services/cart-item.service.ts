import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cart_item } from '../entity/cart_item';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  private apiUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  
  public getCartItemsByCartId(cartId:number):Observable<cart_item[]>{
    return this.http.get<cart_item[]>(this.apiUrl+"/cart_items/get/"+cartId);
  }

  public removeItemById(itemId:number):Observable<cart_item>{
    return this.http.delete<cart_item>(this.apiUrl+"/cart_items/remove/"+itemId);
  }

  public getCartItemCountByCartId(cartId:number):Observable<number>{
    return this.http.get<number>(this.apiUrl+"/cart_items/getItemCount/"+cartId);
  }
}
