import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserModel } from '../core/models/user.model';
import { HttpService } from '../core/services/http/http.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    currentUser: UserModel;

    users: UserModel[] = [];

    constructor(private http: HttpService) {

        this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    }

    ngOnInit() {

        this.loadAllUsers();

    }

    deleteUser(id: number) {

        this.http.Delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        
        });
    }

    private loadAllUsers() {
        
        this.http.UserGetAll().pipe(first()).subscribe(users => {
            this.users = users;
        
        });
    }

}
