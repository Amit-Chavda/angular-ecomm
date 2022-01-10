import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin-pane/dashboard/dashboard.component';
import { ManageProductComponent } from './admin-pane/manage-product/manage-product.component';
import { ManageUserComponent } from './admin-pane/manage-user/manage-user.component';
import { ProductFormComponent } from './admin-pane/product-form/product-form.component';
import { UserFormComponent } from './admin-pane/user-form/user-form.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [  
  {path:'' , redirectTo:'/home' , pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'admin-dashboard',component:DashboardComponent},
  {path:'manage-user',component:ManageUserComponent},
  {path:'manage-product',component:ManageProductComponent},
  {path:'user-form',component:UserFormComponent},
  {path:'product-form',component:ProductFormComponent},
  {path:'cart',component:CartComponent},
  {path:'login',component:LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
