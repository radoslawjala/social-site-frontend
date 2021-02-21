import { Component, OnInit } from '@angular/core';
import {UserLogin} from '../../model/user-login';
import {AuthService} from '../../services/auth.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogin: UserLogin = new UserLogin();
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  returnUrl = 'home'

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigateByUrl(this.returnUrl);
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('username', this.userLogin.username);
    formData.append('password', this.userLogin.password);

    this.authService.login(formData).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
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
    //this.router.navigateByUrl(this.returnUrl);
  }
}
