import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { ActivatedRoute } from "@angular/router";

import { first } from 'rxjs/operators';

import { AlertService } from '../core/services/alert/alert.service';

import { HttpService } from '../core/services/http/http.service';

@Component({
    selector: 'app-update-users',
    templateUrl: './update-users.component.html',
    styleUrls: ['./update-users.component.css']
})

export class UpdateUsersComponent implements OnInit {

    id: any;
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    currentUser: any;
    data: any;

    constructor(

        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router,
        private http: HttpService,
        private alertService: AlertService) { }



    ngOnInit() {

        this.id = this.route.snapshot.paramMap.get("id");

        this.http.UserGetById(this.id)
            .pipe(first())
            .subscribe(
                data => {
                    this.data = data;
                },

                error => {

                    this.alertService.error(error);
                    this.loading = false;

                });

        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required]],
            role: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });

    }

    get f() { return this.registerForm.controls; }

    deleteUser() {

        this.http.Delete(this.id).pipe(first()).subscribe(() => {

        });

        this.router.navigate(['login']);
    }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;

        this.http.Delete(Number(this.id))
            .pipe(first())
            .subscribe(
                data => { },
                error => {

                    this.alertService.error(error);
                    this.loading = false;

                });


        this.http.UserUpdate(this.registerForm.value, Number(this.id))
            .pipe(first())
            .subscribe(
                data => {

                    this.alertService.success('Update Successful');
                    this.router.navigate(['login']);

                },

                error => {

                    this.alertService.error(error);
                    this.loading = false;

                });
    }
} 