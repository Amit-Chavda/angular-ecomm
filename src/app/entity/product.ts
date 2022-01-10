import { ProductCategory } from "./ProductCategory";

export interface Product{
    id:number;
    name:string;
    description:string;
    price:number;
    qty:number;
    category:ProductCategory;
    image:any;
}