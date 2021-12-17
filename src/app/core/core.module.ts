import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthGuard }  from './auth/auth.guard';
import { FirstRegisterGuard } from './auth/first-register.guard';

import { AlertService }  from './services/alert/alert.service';
import { AuthenticationService }  from './services/authentication/authentication.service';
import { HttpService }  from './services/http/http.service';

import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { SearchDataInterceptor } from './interceptors/search-data.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
      AuthGuard,  
      AlertService,
      AuthenticationService,
      FirstRegisterGuard,
      HttpService,
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: SearchDataInterceptor, multi: true },
  ]
})
export class CoreModule { }
