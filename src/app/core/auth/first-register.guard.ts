import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { HttpService } from '../services/http/http.service';

@Injectable()
export class FirstRegisterGuard implements CanActivate {
    currentUser: UserModel;
    users: UserModel[] = [];

    constructor(private router: Router, private http: HttpService) { 
        this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        debugger
        if (!sessionStorage.getItem('currentUser') || this.currentUser.role == "admin") {
            return true;
        }
        this.router.navigate([''], { queryParams: { returnUrl: state.url }});
        return false;
    }
}