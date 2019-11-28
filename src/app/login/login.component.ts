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

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
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
        this.router.navigate(['/dashboard']);
      }
    },
    (err) => console.log(err));
  }
}
