import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {

        return this.http.post<any>(`http://localhost:4000/users/authenticate`, { email: email, password: password })
            .pipe(map(user => {
                if (user && user.token) {
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }

    logout() {
        sessionStorage.removeItem('currentUser');
    }
}