import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



import { UserModel } from '../../models/user.model';

@Injectable()

export class HttpService {
    constructor(private http: HttpClient) { }

    UserGetAll() {
        return this.http.get<UserModel[]>(`http://localhost:4000/users`);
    }

    UserGetById(id: number) {
        return this.http.get(`http://localhost:4000/users/` + id);
    }

    UserRegister(user: UserModel) {
        return this.http.post(`http://localhost:4000/users/register`, user);
    }

    UserUpdate(user: UserModel, id: number) {
        user.id = id
        return this.UserRegister(user);
    }

    Delete(id: number) {
        return this.http.delete(`http://localhost:4000/users/` + id);
    }
}