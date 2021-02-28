import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http-service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserPost} from "../../model/post";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  userPost: UserPost = new UserPost();
  postForm: FormGroup;
  isSuccessful = false;
  isPostSendingFailed = false;
  errorMessage = '';

  constructor(private httpService: HttpService, private formBuilder: FormBuilder, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      profile: ['']
    })
  }

  onSubmit(): void {
    const formData = new FormData();
    this.userPost.userID = this.tokenStorage.getUser().id;
    this.userPost.date = new Date().toLocaleString();
    formData.append('file', this.postForm.get('profile').value);
    formData.append('userID', this.userPost.userID);
    formData.append('title', this.userPost.title);
    formData.append('content', this.userPost.content);
    formData.append('date', this.userPost.date);
    console.log(this.userPost);

    this.httpService.addPost(formData).subscribe(data => {
      this.isSuccessful = true;
      this.isPostSendingFailed = false;
    }, err => {
      this.errorMessage = err.error.message;
      this.isPostSendingFailed = true;
    })
  }

}
