import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../core/models/user.model';
import { HttpService } from '../../../core/services/http/http.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  currentUser: UserModel;
  users: UserModel[] = [];

  constructor(private http: HttpService) {
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

}
