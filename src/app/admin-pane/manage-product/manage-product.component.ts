import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Product } from 'src/app/entity/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css'],
})
export class ManageProductComponent implements OnInit {
  
  @Input() searchString="";
  
  @Input() events: Observable<string>;


  imageUrl: any;
  images: string[];
  products: Product[] = [];

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
  ) {}
  
  ngOnInit(): void {
    this.events.subscribe(
      response=>{
        this.onTextChanged(response);
    });
    this.getAll();
  }

  openAddDialog() {
    this.dialog.open(ProductFormComponent, {
      minHeight: '400px',
      minWidth: '600px',
      closeOnNavigation: true,
      data: {
        formType: 'add',
        product: {
          name: '',
          description: '',
          category: {},
          price: '',
        },
      },
    });
  }

  openEditDialog(id: Number) {
    this.dialog.open(ProductFormComponent, {
      minHeight: '400px',
      minWidth: '600px',
      closeOnNavigation: true,
      data: {
        id: id,
        formType: 'edit',
      },
    });
  }

  onEdit(id: Number) {
    this.openEditDialog(id);
  }

  onTextChanged(searchString){
    
    this.searchString=searchString;
    if(this.searchString!=""){
      this.productService.getAllByNameAndDescription(this.searchString)
      .subscribe(
        (response)=>{
          this.products=response;
        },
        (error:HttpErrorResponse)=>{
          console.log(error.message);
        });
    }else{
      this.getAll();
    }
  }

  onDelete(id: Number) {
    if (confirm('Are you sure to delete this item?')) {
      this.productService.removeById(id).subscribe(
        (response) => {
          alert('Item deleted sucessfully!');
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  getAll() {
    this.productService.getAll().subscribe(
      (response) => {
        this.products = response;
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
