import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const currentUserRole = localStorage.getItem('role');
    if(currentUserRole) {
      if(!route.data.roles.find(role => role === currentUserRole)) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  
}
