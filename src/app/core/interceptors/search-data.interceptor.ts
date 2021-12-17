import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';

import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class SearchDataInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let users: any[] = JSON.parse(sessionStorage.getItem('users')) || [];

        return of(null).pipe(mergeMap(() => {

            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {

                let filteredUsers = users.filter(user => {
                    return user.email === request.body.email && user.password === request.body.password;

                });

                if (filteredUsers.length) {

                    let user = filteredUsers[0];
                    let body = {
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        token: 'C7oWDgDOXL'
                    };

                    return of(new HttpResponse({ status: 200, body: body }));

                } else {
                    return throwError({ error: { message: 'Email or password is incorrect' } });
                }
            }

            if (request.url.endsWith('/users') && request.method === 'GET') {

                if (request.headers.get('Authorization') === 'Bearer C7oWDgDOXL') {

                    return of(new HttpResponse({ status: 200, body: users }));

                } else {

                    return throwError({ status: 401, error: { message: 'Unauthorised' } });
                }
            }

            if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {

                if (request.headers.get('Authorization') === 'Bearer C7oWDgDOXL') {

                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    return of(new HttpResponse({ status: 200, body: user }));

                } else {

                    return throwError({ status: 401, error: { message: 'Unauthorised' } });

                }
            }

            if (request.url.endsWith('/users/register') && request.method === 'POST') {

                let newUser = request.body;

                if (!newUser.id)
                    newUser.id = users.length + 1;

                users.push(newUser);
                sessionStorage.setItem('users', JSON.stringify(users));

                return of(new HttpResponse({ status: 200 }));
            }

            if (request.url.endsWith('/users/update') && request.method === 'PUT') {

                let newUser = request.body;

                users.push(newUser);
                sessionStorage.setItem('users', JSON.stringify(users));

                return of(new HttpResponse({ status: 200 }));
            }

            if (request.url.match(/\/users\/\d+$/) && request.method === 'DELETE') {

                if (request.headers.get('Authorization') === 'Bearer C7oWDgDOXL') {

                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if (user.id === id) {
                            users.splice(i, 1);
                            sessionStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    return of(new HttpResponse({ status: 200 }));
                } else {

                    return throwError({ status: 401, error: { message: 'Unauthorised' } });

                }
            }

            return next.handle(request);

        }))

            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());
    }
}