import { Component, OnInit } from '@angular/core';
import { Roles } from '../models/roles';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  getUserState() {
    const activeToken = sessionStorage.getItem('token');
    if (!activeToken) {
      return false;
    }
    return true;
  }

  isAdmin() {
    const userRole = sessionStorage.getItem('role');
    if(userRole != Roles.Admin){
      return false;
    }
    return true;
  }

  logout() {
    sessionStorage.clear();
  }
}
