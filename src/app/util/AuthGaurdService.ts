import { Injectable } from '@angular/core';
 import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authentificationService } from '../services/authentification.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

    constructor(private router : Router,private aithService:authentificationService) {
    }
    canActivate (route:ActivatedRouteSnapshot,state:RouterStateSnapshot) {

       if(this.aithService.isUserLoggedIn())
        return true;
        this.router.navigate(['user/login'])
        return false;
    }
    

   
}


