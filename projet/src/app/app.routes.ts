import { ListAllUsersComponent } from './Admin/list-all-users/list-all-users.component';

import { Routes, RouterModule, provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './user/home/home.component';

import { Component } from '@angular/core';
import { HomeAuthorComponent } from './Author/home-author/home-author.component';
import { CreatePostComponent } from './Author/create-post/create-post.component';
import { ListComponent } from './Author/list/list.component';
import { UpdateAuthorComponent } from './Author/update-author/update-author.component';
import { HomeAdminComponent } from './Admin/home-admin/home-admin.component';
import { ListAllPostComponent } from './Admin/list-all-post/list-all-post.component';
import { AuthGuard } from './AuthGuard/authGuard';
import { LoginComponent } from './user/login/login.component';
import { PostDetailComponent } from './user/post-detail/post-detail.component';
import { SignUpUserComponent } from './user/sign-up-user/sign-up-user.component';
import { ValidateComponent } from './user/validate/validate.component';
import { DetailsPostsUserComponent } from './Admin/details-posts-user/details-posts-user.component';


export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent },
    {path:"user/validate", component:ValidateComponent},
    { path: "signUp", component: SignUpUserComponent },
    { path: "post/:id/detail", component: PostDetailComponent },
    { path: "user/:id/posts", component: DetailsPostsUserComponent },
    { path: 'author', component: HomeAuthorComponent, canActivate: [AuthGuard] },
    { path: 'create', component: CreatePostComponent, canActivate: [AuthGuard] },
    { path: 'list', component: ListComponent, canActivate: [AuthGuard] },
    { path: 'listAllPost', component: ListAllPostComponent, canActivate: [AuthGuard] },
    { path: 'listAllUsers', component: ListAllUsersComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: HomeAdminComponent, canActivate: [AuthGuard] },
    { path: 'update/:id/post', component: UpdateAuthorComponent, canActivate: [AuthGuard] },
    { path: "**", redirectTo: "", pathMatch: 'full' },
];

export const appRoutes = provideRouter(routes)