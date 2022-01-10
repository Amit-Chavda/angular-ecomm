import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../entity/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  
  public addUser(user:User):Observable<User>{
    user.createdTime=new Date().toString();
    return this.http.post<User>(`${this.apiUrl}/user/register`,user);
  }

  public getUserByEmail(email:string):Observable<User>{
    return this.http.get<any>(this.apiUrl+"/user/find/"+email);
  }

  public userLogin(user:User):Observable<any>{
    return this.http.post<User>(this.apiUrl+"/user/login",user);
  }
  public getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl+"/user/getall");
  }

  public deleteUserById(userId:number):Observable<User>{
    return this.http.delete<User>(this.apiUrl+"/user/delete/"+userId);
  }

  public updateUserById(user:User):Observable<User>{
    return this.http.put<User>(this.apiUrl+"/user/update",user);
  }

  public getAllUsersByEmailId(emailId:string):Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl+"/user/getall/"+emailId);
  }
}
