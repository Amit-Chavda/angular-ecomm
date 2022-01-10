import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor() { }
  getData(){
    return  [
      {
        name:"Tony",
        age:20,
        field:"IT"
      },
      {
        name:"Nayan",
        age:22,
        field:"IT"
      },
      {
        name:"Rohit",
        age:24,
        field:"ITIT"
      },
      {
        name:"Bhum",
        age:22,
        field:"CSE"
      },
      {
        name:"Yash",
        age:21,
        field:"EC"
      },];
  }
}
