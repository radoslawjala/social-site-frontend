import { Component, OnInit } from '@angular/core';
import {UserRegister} from '../../model/user-register';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userRegister: UserRegister = new UserRegister();
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  url;
  uploadForm: FormGroup;

  constructor(private authService: AuthService,private httpClient: HttpClient,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    })
  }

  onFileSelect(event): void {
    if(event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.url = reader.result;
      }
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    formData.append('username', this.userRegister.username);
    formData.append('password', this.userRegister.password);
    formData.append('email', this.userRegister.email);
    formData.append('firstname', this.userRegister.firstname);
    formData.append('lastname', this.userRegister.lastname);
    formData.append('hobbies', this.userRegister.hobbies);
    formData.append('phoneNumber', this.userRegister.phoneNumber.toString());

    console.log(this.userRegister);

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
    // this.httpClient.post<any>('http://localhost:8080/api/auth/signup', formData).subscribe(
    //   (res) =>  {
    //     this.isSuccessful = true;
    //     this.isSignUpFailed = false;
    //
    //   },
    //   (err) => {
    //     this.errorMessage = err.error.message;
    //     this.isSuccessful = false;
    //     this.isSignUpFailed = true;
    //   }
    // );
  }

}
