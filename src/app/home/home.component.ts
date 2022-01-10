import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Product } from '../entity/product';
import { ProductCategory } from '../entity/ProductCategory';
import { CartItemService } from '../services/cart-item.service';
import { CartService } from '../services/cart.service';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

  priceFilter: string;
  priceFilterList: string[] = ['Low to High', 'High to Low'];

  categories:ProductCategory[];
  products: Product[] = [];
  productQnty: number = 1;
  cartItemCount:number;

  constructor(
    private productService: ProductService,
    private categoryService:ProductCategoryService,
    private cookieService: CookieService,
    private cartItemService:CartItemService,
    private cartService:CartService,
  ) {}


  searchStringChanged(searchString){
    this.productService.getAllByNameAndDescription(searchString)
    .subscribe(
      response=>{
        this.products=response;
      },
      error=>{
        console.log(error.message);
      });
  }
  ngOnInit() {
    
    this.loadProductCategories();
    
    if (this.cookieService.check(environment.userTokenKey)) {
      this.loadAllProducts();
    }
  }

  decreaseQnty(index: number): void {
    if (this.products[index].qty <= 1) {
      this.products[index].qty = 1;
    } else {
      this.products[index].qty -= 1;
    }
  }



  onCategorySelected(category){
    if(category=="all"){
      this.loadAllProducts();
    }else{
      this.productService.getByCategoryId(category.id)
    .subscribe(
      response=>{
        this.products=response;
      });
    }
  }

  increaseQnty(index: number): void {
    if (this.products[index].qty >= 10) {
      this.products[index].qty = 10;
    } else {
      this.products[index].qty += 1;
    }
  }

  setDefaultQtyForAllPreoduct(response: Product[]) {
    response.forEach((element) => {
      element.qty = 1;
    });

    this.products = response;
  }

  addToCart(product) {
    //get user id stored in cookies
    let userId: number = Number(
      this.cookieService.get(environment.userTokenKey)
    );

    this.productService.addToCartProduct(userId, product.id,product.qty)
    .subscribe(
      (response) => {
        alert('Product Added to Cart!');

        this.cartService.getCartByUserId(userId)
        .subscribe(
          response=>{
            this.cartItemService.getCartItemCountByCartId(response.id)
            .subscribe(
              response=>{
                this.cartItemCount=response;
              });    
        });
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  loadProductCategories(){
    this.categoryService.getAll()
    .subscribe(
      response=>{
      this.categories = response;
    },
    error=>{
      console.log(error.message);
    });
  }

  loadAllProducts(){
    this.productService.getAll().subscribe(
      (response) => {
        this.setDefaultQtyForAllPreoduct(response);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

}
