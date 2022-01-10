import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { cart } from '../entity/cart';
import { cart_item } from '../entity/cart_item';
import { Product } from '../entity/product';
import { CartItemService } from '../services/cart-item.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  
  cols: string[] = ['Product Details', 'Name', 'Qty', 'Price', 'Total'];
  products: Product[] = [];
  clickedRows = new Set<Product>();
  cartItems: cart_item[];
  cartId: number;
  cart: cart = {} as cart;
  
  isEmpty: boolean=true;
  cartItemCount: number;

  constructor(
    private cartService: CartService,
    private cookieSrvice: CookieService,
    private cartItemService: CartItemService
  ) {}

  removeItem(index) {
    let cartId = this.cartItems[index].id;

    this.cartItemService.removeItemById(cartId).subscribe((response) => {
      this.loadCartDetails();
      this.loadCartItems();

      this.cartService
        .getCartByUserId(this.getUserId())
        .subscribe((response) => {
          this.cartItemService
            .getCartItemCountByCartId(response.id)
            .subscribe((response) => {
              this.cartItemCount = response;
            });
        });
    });
  }

  ngOnInit(): void {
    this.loadCartItems();
    this.loadCartDetails();
  }

  loadCartDetails(): void {
    this.cartService.getCartByUserId(this.getUserId())
    .subscribe((response) => {
      this.cart = response;
    });
  }

  getUserId(): number {
    return Number(this.cookieSrvice.get(environment.userTokenKey));
  }

  loadCartItems() {
    let userId: number = this.getUserId();

    this.cartService.getCartByUserId(userId).subscribe((response) => {
      this.cartId = response.id;

      this.cartItemService
        .getCartItemCountByCartId(response.id)
        .subscribe((response) => {
          if (response > 0) {
            
            this.cartItemService
              .getCartItemsByCartId(this.cartId)
              .subscribe((response) => {
                this.cartItems = response;
                this.products = [];
                response.forEach((item) => {
                  item.product.qty = item.qty;
                  this.products.push(item.product);
                  this.updateCartStatus(false);
                });
                
              });

          } else {

            this.updateCartStatus(true)
            this.cart.totalPrice = 0;
            this.cart.totalQty = 0;
            this.cartService
              .updateCartByUserId(this.getUserId(), this.cart)
              .subscribe((response) => {
                //console.log(response);
              });
          }
        });
    });
  }

  updateCartStatus(status:boolean){
    this.isEmpty=status;  
  }
}
