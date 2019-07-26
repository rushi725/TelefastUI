import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAndRoleService implements CanActivate {

  constructor(private router: Router, private userService: UserService) { }

  // tslint:disable-next-line: max-line-length
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = true;
    if (this.userService.isUserLoggedIn()) {
      switch (route.url[0].path) {
        case 'orderedTasks': if (this.userService.getRoles() === 'ROLE_TEAM_MANAGER') {
          return true;
        } else {
          this.router.navigate(['forbidden']);
          return false;
        }
        case 'dashboard': if (this.userService.getRoles() === 'ROLE_PRODUCT_MANAGER') {
          return true;
        } else {
          this.router.navigate(['forbidden']);
          return false;
        }
        case 'orderedTask': if (this.userService.getRoles() === 'ROLE_TEAM_MEMBER') {
          return true;
        } else {
          this.router.navigate(['forbidden']);
          return false;
        }
        case 'orderedServices': if (this.userService.getRoles() === 'ROLE_PROJECT_MANAGER') {
          return true;
        } else {
          this.router.navigate(['forbidden']);
          return false;
        }
        case 'serviceManager': if (this.userService.getRoles() === 'ROLE_SERVICE_MANAGER') {
          return true;
        } else {
          this.router.navigate(['forbidden']);
          return false;
        }
        // tslint:disable-next-line: max-line-length
        case 'workflow': if (this.userService.getRoles() === 'ROLE_SERVICE_MANAGER' || this.userService.getRoles() === 'ROLE_PROJECT_MANAGER') {
          return true;
        } else {
          this.router.navigate(['forbidden']);
          return false;
        }
        // tslint:disable-next-line: max-line-length
        case 'employee': if (this.userService.getRoles() === 'ROLE_SUPER') {
          return true;
        } else {
          this.router.navigate(['forbidden']);
          return false;
        }
        default:
          break;
      }
    } else {
      this.router.navigate(['home']);
      return false;
    }

  }
}
