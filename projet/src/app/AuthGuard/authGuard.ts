import { Observable } from 'rxjs';
import { AuthService } from './authService';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})

export class AuthGuard implements CanActivate{
    constructor(private AuthService: AuthService, private Router : Router){}

    canActivate(
        route:ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):Observable<boolean | UrlTree> | Promise <boolean | UrlTree> | boolean | UrlTree {
        if(this.AuthService.isLoggedIn()){
            return true
        }else{
            this.Router.navigate(['/login'])
            return false
        }
    }
}