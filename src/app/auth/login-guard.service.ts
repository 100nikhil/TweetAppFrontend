import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../services/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate{

  constructor(private ls: LoginServiceService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    let auth = !!localStorage.getItem("token");

    // this.ls.loggedIn.subscribe(val => {
    //   console.log(val);
    //   auth = val;
    // });

    if(auth){
      return this.router.createUrlTree(['/mainpage']);
    }
    else{
      console.log(auth);
      return true;
    }
  }
}

//take('1') is added to pipe(), if we want to listen to an observable only once
//ex: this.authservice.user.pipe(take(1), map(....));
