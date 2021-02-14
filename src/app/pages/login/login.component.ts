import { Component, OnInit } from '@angular/core';
import {UserLogin} from '../../model/user-login';
import {AuthService} from '../../services/auth.service';
import {TokenStorageService} from '../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogin: UserLogin = new UserLogin();
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('username', this.userLogin.username);
    formData.append('password', this.userLogin.password);

    this.authService.login(formData).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        if (err.error instanceof ErrorEvent) {
          console.error("Error Event");
        } else {
          console.log(`error status : ${err.status} ${err.statusText}`);
          switch (err.status) {
            case 401:      //login
              this.errorMessage = 'Bad credentials'
              break;
            case 403:     //forbidden
              this.errorMessage = "Operation forbidden";
              break;
          }
        }
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
