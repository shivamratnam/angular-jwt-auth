import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
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
    console.log(this.signupForm);
    if(this.signupForm.status == 'VALID'){

    }
  }

}
