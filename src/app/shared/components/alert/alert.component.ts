import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['./alert.component.css']
})

export class AlertComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(public snackBar: MatSnackBar) { }

    openSnackBar(message: string, action: string, type: string) {
       debugger 
        if(type == "success"){
        this.snackBar.open(message, action, {
          duration: 2000
        });
    }
    
    if(type == "error"){
        this.snackBar.open(message, action, {
          duration: 2000,
          panelClass: ['blue-snackbar']
        });
    }
  }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
}