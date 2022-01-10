import { Component, Inject, OnInit } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/entity/product';
import { ProductCategory } from 'src/app/entity/ProductCategory';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{
  categories: ProductCategory[]; 
  selectedFile: File;
  imageName: any;
  formType:string;
  product:Product;

  constructor(
    private dialogRef: MatDialogRef<ProductFormComponent>,
    private productService:ProductService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private categoryService:ProductCategoryService
    ) { }
  
  ngOnInit(): void {
    this.formType=this.data.formType;

    this.loadProductCategories();

    if(this.formType=="edit"){
      this.productService.getById(this.data.id).subscribe(
        (response)=>{
          this.product=response;
        },(error)=>{
          alert(error.message);
        }
      );
    }else if(this.formType=="add"){
      this.product=this.data.product;
    }
  }


  onSubmitClick(productDetails:NgForm){
    
    if(this.formType=="edit"){
      this.productService.updateUserById(this.product).subscribe(
        (response)=>{
          alert("Item updated successfully!");
          this.dialogRef.close();
        },(error)=>{
          alert(error.message);
        });

    }else if(this.formType=="add"){
    
      const formData = new FormData();
        formData.append('file', this.selectedFile);
        
        this.productService.uploadFile(formData).subscribe(
          (response)=>{      
            
            this.product.image=response.body;
            
            this.productService.addProduct(this.product)
            .subscribe(
              (response)=>{
                this.dialogRef.close();
                console.log(response);
                alert("Item added successfully!");
              },(error)=>{
                alert(error.message);
             });   
          },(error)=>{
            alert(error.message);
          }
        )
    }
  }


  categoryChanged(category){
    this.product.category=category;
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  loadProductCategories(){
    this.categoryService.getAll()
    .subscribe(
      response=>{
      this.categories = response;
    },
    error=>{
      console.log(error.message);
    });
  }
}

