import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../core/models/user.model';
import { HttpService } from '../../../core/services/http/http.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  currentUser: UserModel;

  users: UserModel[] = [];

  constructor(private http: HttpService) {

    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  }

  ngOnInit() {
  }

}
