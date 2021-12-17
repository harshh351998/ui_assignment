import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { first } from 'rxjs/operators';

import { AlertService } from '../core/services/alert/alert.service';

import { HttpService } from '../core/services/http/http.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    registerForm: FormGroup;

    loading = false;

    submitted = false;

    constructor(

        private formBuilder: FormBuilder,

        private router: Router,

        private http: HttpService,

        private alertService: AlertService) { }

    ngOnInit() {

        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required]],
            role: ['', [Validators.required]],
            password: ['', [Validators.required]]

        });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {

        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;

        this.http.UserRegister(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {

                    this.alertService.success('Registration Successful');

                    this.router.navigate(['']);

                },

                error => {

                    this.alertService.error(error);

                    this.loading = false;
                });
    }
}
