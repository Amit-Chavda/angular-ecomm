import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Admin } from '../entity/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  public adminLogin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.apiUrl + "/admin/login", admin);
  }
}
