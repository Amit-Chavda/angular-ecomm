import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from 'src/app/register/register.component';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-actionbar',
  templateUrl: './actionbar.component.html',
  styleUrls: ['./actionbar.component.css']
})
export class ActionbarComponent implements OnInit {

  @Output() manageEvenEmitter=new EventEmitter<string>();
  @Output() searchEvenEmitter=new EventEmitter<string>();
  
  searchString:string;
  manage="Users";
  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {}

  onValueChange(value){
    this.manageEvenEmitter.emit(value);
  }

  onTextChanged(){
    //console.log(this.searchString);
    this.searchEvenEmitter.emit(this.searchString)
  }

  openAddDialog(){
    
    if(this.manage=="Products"){
      this.openAddProductDialog();
    }else if(this.manage=="Users"){
      this.openUserRegistationDialog();
    }
  }

  openAddProductDialog() {
    this.dialog.open(ProductFormComponent, {
      minHeight: '400px',
      minWidth: '600px',
      closeOnNavigation: true,
      data: {
        formType: 'add',
        product: {
          category: {},
        },
      },
    });
  }

  openUserRegistationDialog() {
    this.dialog.open(RegisterComponent, {
      minHeight: '600px',
      minWidth: '600px',
      closeOnNavigation: true
    });
  }  

}
