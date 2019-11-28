import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  public login(email: string, password: string){
    let url = this.getBaseURL() + 'login';
    let body = {
      email: email,
      password: password
    }
    this.http.post(url, body).subscribe( result =>{
      console.log(result);
    },
    err => console.log(err));
  }
  public signup(email: string, password: string, name?: string){

  }
  public isLoggedIn(): boolean {
    return true;
  }

  public getBaseURL(){
    return 'localhost:8080/';
  }
}
