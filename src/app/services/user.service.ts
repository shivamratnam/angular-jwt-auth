import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  /* This function is used to validate user and login */
  public validateUser(email: string, password: string): Observable<any> {
    let url = this.getBaseURL() + '/user/' + 'login';
    let body = {
      email: email,
      password: password
    }
    return this.http.post(url, body, {observe: 'response'}).pipe(
      map( res => {
        let token = res.headers.get('access_token');
        let name = res.headers.get('name');
        let email = res.headers.get('email');
        // Store required data inside local storage
        if(token){
          localStorage.setItem("access_token", token);
          localStorage.setItem("name", name);
          localStorage.setItem("email", email);
        }
        return res;
      })
    );
  }

  /* This function is used to register new user */
  public createUser(name: string, email: string, password: string): Observable<any>{
    let url = this.getBaseURL() + '/user/' + 'signup';
    let body = {
      name: name,
      email: email,
      password: password
    }
    return this.http.post(url, body, {observe: 'response'}).pipe(
      map( res => {
        let token = res.headers.get('access_token');
        let name = res.headers.get('name');
        let email = res.headers.get('email');
        // Store required data inside local storage
        if(token){
          localStorage.setItem("access_token", token);
          localStorage.setItem("name", name);
          localStorage.setItem("email", email);
        }
        return res;
      })
    );
  }
  public isLoggedIn(): boolean {
    return true;
  }

  public getBaseURL(){
    return 'http://localhost:4200';
  }
}
