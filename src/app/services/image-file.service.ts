import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageFileService {

  
  private apiUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
}
