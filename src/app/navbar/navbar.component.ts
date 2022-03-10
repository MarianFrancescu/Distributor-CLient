import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  // this will return true if user is logged in and false if user is not logged
  getUserState() {
    const activeToken = sessionStorage.getItem('token');
    if (!activeToken) {
      return false;
    }
    return true;
  }

  logout() {
    sessionStorage.clear();
  }
}
