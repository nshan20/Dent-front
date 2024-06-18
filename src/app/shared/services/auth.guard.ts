import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";
import {UsersService} from "./users.service";

@Injectable()

export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private autServis: AuthService,
    private router: Router,
    private usersService: UsersService,
    private authService: AuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let token = JSON.parse(<string>localStorage.getItem("token"));

    if (token) {
      return true;

      // this.usersService.getCheckOut()
      //   .subscribe((value: any) => {
      //     return true;
      //   }, error => {
      //     this.authService.logout();
      //     this.router.navigate(['/login'], {
      //       queryParams: {
      //         accsesDenaid: true
      //       }
      //     });
      //     return false;
      //   })
    }

    if (token) {
      return true
    } else {
      this.authService.logout();
      this.router.navigate(['/login'], {
        queryParams: {
          accsesDenaid: true
        }
      });
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
