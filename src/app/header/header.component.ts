import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userLoggedIn: boolean = false;
  loginStatusSubscription: Subscription;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginStatusSubscription = this.userService.getLoginStatus().subscribe( status => {
      this.userLoggedIn = status;
    });
  }

  public logout(){
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('access_token');
    this.userService.setLoginStatus(false);
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    if(this.loginStatusSubscription) this.loginStatusSubscription.unsubscribe();
  }

}
