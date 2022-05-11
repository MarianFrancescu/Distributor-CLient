import { Component } from '@angular/core';
import { Roles } from '../models/roles';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {


  getUserState() {
    const activeToken = localStorage.getItem('token');
    if (!activeToken) {
      return false;
    }
    return true;
  }

  isAdmin() {
    const userRole = localStorage.getItem('role');
    if (userRole != Roles.Admin) {
      return false;
    }
    return true;
  }

  logout() {
    localStorage.clear();
  }
}
