import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { first } from 'rxjs/operators';

import { AlertService } from '../core/services/alert/alert.service';

import { AuthenticationService } from '../core/services/authentication/authentication.service';


@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    loading = false;

    submitted = false;

    returnUrl: string;

    constructor(

        private formBuilder: FormBuilder,

        private route: ActivatedRoute,

        private router: Router,

        private authenticationService: AuthenticationService,

        private alertService: AlertService) { }

    ngOnInit() {

        this.loginForm = this.formBuilder.group({

            email: ['', Validators.required],
            password: ['', Validators.required]

        });

        this.authenticationService.logout();

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() { return this.loginForm.controls; }

    onSubmit() {

        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        this.authenticationService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {

                    this.router.navigate([this.returnUrl]);

                },

                error => {

                    debugger
                    this.alertService.error(error);
                    this.loading = false;

                });
    }
}
