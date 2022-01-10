import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable} from 'rxjs';
import { User } from 'src/app/entity/user';
import { UserService } from 'src/app/services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit,AfterViewInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() searchString="";
  
  @Input() events: Observable<string>;

  displayedColumns: string[] = ['position','name', 'email','createdTime','active', 'action'];
  dataSource;
  
  allUserData:User[];


  constructor(
    private userService:UserService,
    private dialog:MatDialog,
    ){}


  openDialog(emailId:any){
    this.dialog.open(UserFormComponent, {
      minHeight: '400px',
      minWidth: '600px',
      data:{
        emailId:emailId
      }
    });
  }


  onTextChanged(searchString){
    
    this.searchString=searchString;

    if(this.searchString!=""){
      this.userService.getAllUsersByEmailId(this.searchString).subscribe(
        (response)=>{
          this.allUserData=response;
          this.dataSource = new MatTableDataSource<User>(this.allUserData);
        },
        (error:HttpErrorResponse)=>{
          alert(error.message);
        });
    }else{
      this.getUsers();
    }
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    this.events.subscribe(
      response=>{
        this.onTextChanged(response);
    });
    this.getUsers();
  }

  onDelete(user:User){
    this.userService.deleteUserById(user.id).subscribe(
      (response)=>{
        this.getUsers();
        alert("User with "+user.id+" deleted successfully!");
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      });
  }

  getUsers():void{
    this.userService.getAllUsers().subscribe(
      (response)=>{
        this.allUserData=response;
        this.dataSource = new MatTableDataSource<User>(this.allUserData);
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      });
  }
}
