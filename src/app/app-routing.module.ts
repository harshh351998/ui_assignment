import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UpdateUsersComponent } from './update-users/update-users.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthGuard } from './core/auth/auth.guard';
import { FirstRegisterGuard } from './core/auth/first-register.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home' }, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'users', component: ListUsersComponent, data: { title: 'Users' } },
  { path: 'update/:id', component: UpdateUsersComponent, data: { title: 'Update' } },
  { path: 'register', component: RegisterComponent, data: { title: 'Register' }, canActivate: [FirstRegisterGuard] },
  { path: '**', component: PageNotFoundComponent, data: { title: 'Page not found :(' }, }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);