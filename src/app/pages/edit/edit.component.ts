import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../services/token-storage.service';
import {HttpService} from '../../services/http-service';
import {UserDetails} from '../../model/user-details';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  currentUser: any;
  userDetails: UserDetails = new UserDetails();
  isSuccessful = false;
  isDataUpdateFailed = false;
  errorMessage = '';
  url;
  uploadForm: FormGroup;

  constructor(private tokenService: TokenStorageService, private httpService: HttpService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    })
    this.currentUser = this.tokenService.getUser();

    this.httpService.getUserDetails(String(this.currentUser.id)).subscribe(
      data => {
        this.userDetails = JSON.parse(JSON.stringify(data));
      },
      error => {
        console.log(error);
      }
    );
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
    formData.append('id', this.currentUser.id)
    formData.append('firstname', this.userDetails.firstname);
    formData.append('lastname', this.userDetails.lastname);
    formData.append('hobbies', this.userDetails.hobbies);
    formData.append('phoneNumber', this.userDetails.phoneNumber.toString());

    console.log(this.userDetails);

    this.httpService.updateUserData(formData).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isDataUpdateFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isDataUpdateFailed = true;
      }
    )
  }
}
