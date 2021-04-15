import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {NgModule} from '@angular/core';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {AllUsersComponent} from './pages/all-users/all-users.component';
import {SelectedUserProfileComponent} from './pages/selected-user-profile/selected-user-profile.component';
import {AddPostComponent} from "./pages/add-post/add-post.component";
import {EditComponent} from './pages/edit/edit.component';
import {ChangePasswordComponent} from './pages/change-password/change-password.component';
import {ChatComponent} from './pages/chat/chat.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'all-users', component: AllUsersComponent},
  {path: 'add-post', component: AddPostComponent},
  {path: 'users/:id', component: SelectedUserProfileComponent},
  {path: 'edit', component: EditComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'changePassword', component: ChangePasswordComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
