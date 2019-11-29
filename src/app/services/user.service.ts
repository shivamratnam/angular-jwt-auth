import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginStatus = new BehaviorSubject(false);

  constructor(
    private http: HttpClient
  ) { }

  /* This function is used to validate user and log in */
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
  /* This function is used to validate user access_token */
  public validateToken(token: string): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'access_token': token
      })
    }
    let url = this.getBaseURL() + '/user/' + 'token';
    let body = null;
    return this.http.post(url, body, httpOptions);
  }

  public getBaseURL(){
    return 'http://localhost:4200';
  }

  /* This function is used to track the user login status */
  public getLoginStatus(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }
  public setLoginStatus(status: boolean): void{
    this.loginStatus.next(status);
  }

}
