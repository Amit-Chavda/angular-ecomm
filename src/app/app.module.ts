import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RecordsService } from "./records.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormsModule } from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './admin-pane/dashboard/dashboard.component';
import { AdminLoginComponent } from './admin-pane/admin-login/login.component';
import { ActionbarComponent } from './admin-pane/actionbar/actionbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { ManageUserComponent } from './admin-pane/manage-user/manage-user.component';
import { ManageProductComponent } from './admin-pane/manage-product/manage-product.component';
import {  MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule} from "@angular/material/table";
import { MatBadgeModule} from "@angular/material/badge";
import { UserFormComponent } from './admin-pane/user-form/user-form.component';
import { FooterComponent } from './footer/footer.component';
import { ProductFormComponent } from './admin-pane/product-form/product-form.component';
import {  MatSelectModule } from "@angular/material/select";
import { CartComponent } from './cart/cart.component';
import { CookieService } from "ngx-cookie-service";
import { MatRadioModule } from "@angular/material/radio";
import { MatExpansionModule } from "@angular/material/expansion";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    AdminLoginComponent,
    RegisterComponent,
    DashboardComponent,
    ActionbarComponent,
    ManageUserComponent,
    ManageProductComponent,
    UserFormComponent,
    FooterComponent,
    ProductFormComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    HttpClientModule,
    MatSidenavModule ,
    MatListModule ,
    MatDividerModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatBadgeModule,
    MatSelectModule,
    MatRadioModule,
    MatExpansionModule
  ],
  exports: [
    MatInputModule
  ],
  providers: [RecordsService, { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
