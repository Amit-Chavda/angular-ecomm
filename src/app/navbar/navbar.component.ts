import { Component, OnInit, Inject, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog,MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AdminLoginComponent } from '../admin-pane/admin-login/login.component';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { CartItemService } from '../services/cart-item.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  @Output() searchStringChangedEventEmitter=new EventEmitter<string>();
  searchString:string="";


  @Input() cartItemCount:number;
  isLoggedIn=environment.isLoggedIn;
  userId:number;
  
  constructor(public dialog:MatDialog,
    private cookieService:CookieService,
    private cartItemService:CartItemService,
    private cartService:CartService) { }
  
  ngOnInit(): void {
    
    this.initializeCart();
    
    if(!this.cookieService.check(environment.userTokenKey)){
      this.isLoggedIn=false;
      if(confirm("Your session expired! Login again!")){
        console.log("Login....");
          this.dialog.open(LoginComponent, {
            minHeight: '400px',
            minWidth: '600px',
            closeOnNavigation: true
          });
      }
    }    
  }
  
  openDialog(){
    this.dialog.open(LoginComponent, {
      minHeight: '400px',
      minWidth: '600px',
      closeOnNavigation: true
    });
  }
  
  
  initializeCart(){
    
    this.userId=Number(this.cookieService.get(environment.userTokenKey));
    this.cartService.getCartByUserId(this.userId)
    .subscribe(
      response=>{
        this.cartItemService.getCartItemCountByCartId(response.id)
        .subscribe(
          response=>{
            this.cartItemCount=response;
          });
        
      });
    

  }

  openAdminLoginDialog():void{
    this.dialog.open(AdminLoginComponent, {
      minHeight: '400px',
      minWidth: '600px',
      closeOnNavigation: true
    });
  }

  logout(){
    this.cookieService.delete(environment.userTokenKey);
  }

  onSearchKeyChanged(event){
    this.searchString=event.target.value;
    this.searchStringChangedEventEmitter.emit(this.searchString);  

  }

}

