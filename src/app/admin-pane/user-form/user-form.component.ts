import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit{

  hide = true;
  user:User;

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,public userService:UserService) {}
  
    ngOnInit(): void {
    this.userService.getUserByEmail(this.data.emailId).subscribe(
      (response)=>{
        this.user=response;
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  errorMsg="";
  onSubmit(): void {
    
    this.userService.updateUserById(this.user).subscribe(
      response=>{
        this.dialogRef.close();
      },
      (error:HttpErrorResponse)=>{
       alert(error.message);
      }
    );
  }
  

}
