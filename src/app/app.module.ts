import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {authInterceptorProviders} from './helpers/auth.interceptor';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AllUsersComponent } from './pages/all-users/all-users.component';
import { SelectedUserProfileComponent } from './pages/selected-user-profile/selected-user-profile.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { EditComponent } from './pages/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    AllUsersComponent,
    SelectedUserProfileComponent,
    AddPostComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
