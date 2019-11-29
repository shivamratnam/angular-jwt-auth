import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginErrorMsg: string = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    let token = localStorage.getItem('access_token');
    if(token){
      this.userService.validateToken(token).subscribe( result => {
        if(result && result.success){
          this.userService.setLoginStatus(true);
          this.router.navigate(['/dashboard']);
        }
      },
      (err) => {
        console.log(err);
        this.userService.setLoginStatus(false);
      });
    }
  }

  /* Login Form Instance */
  loginForm = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(4)
    ]]
  });

  /**
   * This function is used to login the user
   */
  public login(){
    let email = this.loginForm.controls.email.value;
    let password = this.loginForm.controls.password.value;
    // Validate user data
    this.userService.validateUser(email, password).subscribe( result => {
      if(result){
        this.userService.setLoginStatus(true);
        this.router.navigate(['/dashboard']);
      }
    },
    (errObj) => {
      this.loginErrorMsg = errObj.error.message;
    });
  }
}
