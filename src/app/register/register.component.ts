import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { User } from '../entity/user';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{


  hide = true;
  errorMsg="";

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialog: MatDialog, 
    public regDialog: MatDialogRef<RegisterComponent>,
    public userService:UserService,
    private cookieService:CookieService) { }


  onNoClick(): void {
    this.dialogRef.close();
  }
  
  
  openLoginDialog() {
    this.regDialog.close();
    
    this.dialogRef= this.dialog.open(LoginComponent, {
      height: '400px',
      width: '600px',
      closeOnNavigation: true
    });
  }
  
  onRegisterUser(registerData:any): void {
       this.userService.addUser(registerData).subscribe(
         response=>{
          //save user id in cookie
          this.cookieService.set(environment.userTokenKey,response.id+"");
          this.dialogRef.close();
          alert("Register successfully");
         },
         error=>{
           this.errorMsg=error.error.message;
         }
       );
  }

}
