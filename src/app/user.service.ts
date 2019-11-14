import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  private url:String = "http://localhost:9000";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  getUsers():Observable<any[]>{
    return this.http.get<any[]>(
      this.url + "/users"
    );
  }

  addUser(user: User):Observable<any>{
    return this.http.post<any>(
      this.url + "/user",
      user,
      {headers: this.headers}
    );
  }

  updateUser(user: User, id):Observable<any>{
    return this.http.put<any>(
      this.url + "/user/" + id,
      user,
      {headers: this.headers}
    );
  }

  deleteUser(id):Observable<any>{
    return this.http.delete<any>(
      this.url + "/user/" + id
    );
  }
}