import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { API_URLS } from './api.url.config';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 constructor(private http: HttpClient){


 }
 getAllUtilisateurs(): Observable<any>{
   return  this.http.get(API_URLS.USER_URL+`/clients`);  
 }
 addUser(user: User): Observable<User> {
    return this.http.post<User>(API_URLS.USER_URL+ `/register_client`, user); 
  }
  login(user: User): Observable<User> {
    return this.http.post<User>(API_URLS.USER_URL+ `/login`, user); 
  }
  editUser(user: User, idUser: number): Observable<User> {
    return this.http.put<User>(API_URLS.USER_URL+`/update_user/`+idUser, user); 
  }
  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(API_URLS.USER_URL+`/delete/${id}`); 
  } 

}