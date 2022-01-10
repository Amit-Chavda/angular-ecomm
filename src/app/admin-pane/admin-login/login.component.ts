import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AdminLoginComponent {

  constructor(
    public dialogRef: MatDialogRef<AdminLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,public adminService:AdminService,private router:Router) { }


  hide = true;
  
  errorMsg:string="";
  onLogin(loginData: any): void {
    this.adminService.adminLogin(loginData).subscribe(
      data=>{
        alert("login");
        this.dialogRef.close();
        this.router.navigateByUrl("/dashboard");

      },
      (error:HttpErrorResponse)=>{
       this.errorMsg=error.error.message;
       alert(this.errorMsg);
      }
    );
  } 

}
