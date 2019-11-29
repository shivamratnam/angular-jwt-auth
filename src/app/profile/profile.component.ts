import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string = "User1";
  email: string = "user1@gmail.com";

  constructor() { }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.username = localStorage.getItem('name');
  }

}
