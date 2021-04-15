import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../services/validators/must-match';
import {MustDifferent} from '../../services/validators/must-different';
import {AuthService} from '../../services/http/auth.service';
import {TokenStorageService} from '../../services/session/token-storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  errorMessage = '';


  constructor(private formBuilder: FormBuilder, private httpService: AuthService,
              private tokenService: TokenStorageService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: [MustMatch('newPassword', 'confirmPassword'),
        MustDifferent('oldPassword', 'newPassword')]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    } else {
      const formData = new FormData();
      formData.append('oldPassword', this.registerForm.get('oldPassword').value);
      formData.append('newPassword', this.registerForm.get('newPassword').value);
      formData.append('userID', this.tokenService.getUser().id);

      this.httpService.changePassword(formData).subscribe(
        data => {
          console.log(data);
        },
        err => {
          this.errorMessage = err.error.message;
          console.log("error message: " + this.errorMessage);
        }
      )
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
