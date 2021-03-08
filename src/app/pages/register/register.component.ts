import { Component, OnInit } from '@angular/core';
import {UserRegister} from '../../model/user-register';
import {AuthService} from '../../services/http/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MustMatch} from '../../services/validators/must-match';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  url;
  registerForm: FormGroup;
  submitted = false;

  constructor(private authService: AuthService,private httpClient: HttpClient,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.minLength(3), Validators.maxLength(50)]],
      dateOfBirth: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      city: ['', [Validators.required, Validators.maxLength(30)]],
      hobbies: ['', [Validators.required, Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.min(500000000), Validators.max(899999999)]],
      profile: [''],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onFileSelect(event): void {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registerForm.get('profile').setValue(file);

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.url = reader.result;
      }
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.isSuccessful = false;
      this.isSignUpFailed = true;
      return;
    }
    else {
      const formData = new FormData();
      formData.append('username', this.registerForm.get('username').value);
      formData.append('firstname', this.registerForm.get('firstname').value);
      formData.append('lastname', this.registerForm.get('lastname').value);
      formData.append('password', this.registerForm.get('password').value);
      formData.append('email', this.registerForm.get('email').value);
      formData.append('dateOfBirth', (this.registerForm.get('dateOfBirth').value).toString());
      formData.append('city', this.registerForm.get('city').value);
      formData.append('hobbies', this.registerForm.get('hobbies').value);
      formData.append('phoneNumber', (this.registerForm.get('phoneNumber').value).toString());
      formData.append('file', this.registerForm.get('profile').value);

      this.authService.register(formData).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      )
    }
  }
}
