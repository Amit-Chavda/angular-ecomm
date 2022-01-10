import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from '../register/register.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hide = true;
  errorMsg="";


  constructor(
    @Optional() public dialogRef: MatDialogRef<any>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, 
    public dialog: MatDialog,
    public userService:UserService,
    private cookieService:CookieService) { }


  
  onNoClick(): void {
    this.dialogRef.close();
  }

  
  onLogin(loginData: any): void {
    this.userService.userLogin(loginData).subscribe(
      response=>{
        this.cookieService.set(environment.userTokenKey,response.id+"");
        this.dialogRef.close();
        environment.isLoggedIn=true;
        alert("Login successful!");
      },
      (error:HttpErrorResponse)=>{
       this.errorMsg=error.error.message;
      }
    );
  } 
  
  openRegistationDialog() {
    this.dialogRef = this.dialog.open(RegisterComponent, {
      minHeight: '600px',
      minWidth: '600px',
      closeOnNavigation: true
    });
  }
}