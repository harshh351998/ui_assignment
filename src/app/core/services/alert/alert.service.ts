import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { MatSnackBar } from '@angular/material';

@Injectable()
export class AlertService {

    private subject = new Subject<any>();

    constructor(public snackBar: MatSnackBar) {

    }

    success(message: string) {

        this.snackBar.open(message+" 😉", "", {
            duration: 800,
            panelClass: ['success-snackbar']

        });
    }

    error(message: string) {

        this.snackBar.open(message+" 😥", "", {
            duration: 800,
            panelClass: ['error-snackbar']

        });
    }

    getMessage(): Observable<any> {

        return this.subject.asObservable();

    }
}