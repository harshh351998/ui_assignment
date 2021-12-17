import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { UserModel } from '../core/models/user.model';
import { HttpService } from '../core/services/http/http.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})

export class ListUsersComponent implements OnInit {

  currentUser: UserModel;
  
  firstname: string;

  users: UserModel[] = [];
  
  


  constructor(private http: HttpService) {
  
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  
  }

  ngOnInit() {
  
    this.loadAllUsers();
  
  }

  private loadAllUsers() {
  
    this.http.UserGetAll().pipe(first()).subscribe(users => {

      this.users = users;
  
    });
  }

  public searchUsers() {
  
    if (this.firstname != "") {

      this.users = this.users.filter(res => {

        return res.firstName.toLocaleLowerCase().match(this.firstname)

      })

    } else if (this.firstname == "") {

      this.ngOnInit();

    }
  }
}
