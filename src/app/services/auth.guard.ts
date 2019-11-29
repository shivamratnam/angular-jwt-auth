import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let token = localStorage.getItem('access_token');
    if(token){
      return this.userService.validateToken(token).pipe(
        map(result => {
          this.userService.setLoginStatus(result.success);
          if(!result.success){
            this.router.navigate(['/login']);
          }
          return result.success;
        })
      );
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
