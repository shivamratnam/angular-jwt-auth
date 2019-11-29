import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupErrorMsg: string = null;

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

  /* Signup Form Instance */
  signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    passwords: this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      confpassword: ['', Validators.required]
    }, { validators: this.matchPasswords})
  });

  public matchPasswords(pwdGroup: FormGroup){
      if(pwdGroup.controls.password.value !==  pwdGroup.controls.confpassword.value){
        return { notmatched: true }
      }
      return null;
  }

  public signup(){
    if(this.signupForm.status == 'VALID'){
      let name = this.signupForm.controls.name.value;
      let email = this.signupForm.controls.email.value;
      let password = this.signupForm.controls.passwords.value.password;
      // Submit user data
      this.userService.createUser(name, email, password).subscribe( result => {
        if(result){
          this.router.navigate(['/dashboard']);
        }
      },
      (errObj) => {
        this.signupErrorMsg = errObj.error.message;
      });
    }
  }

}
