import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../services/session/token-storage.service';
import {HttpService} from '../../services/http/http-service';
import {UserDetails} from '../../model/user-details';
import {UserPost} from '../../model/post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  userDetails: UserDetails = new UserDetails();
  userPosts: UserPost[];
  retrievedImage: any;
  base64Data: any;

  constructor(private token: TokenStorageService, private httpService: HttpService) {
  }

  ngOnInit(): void {
    if(this.token.getUser()) {
      this.currentUser = this.token.getUser();
      this.httpService.getUserPosts(String(this.currentUser.id)).subscribe(data => {
        this.userPosts = data;
      });
      this.httpService.getUserDetails(String(this.currentUser.id)).subscribe(
        data => {
          this.userDetails = JSON.parse(JSON.stringify(data));
          this.base64Data = this.userDetails.pictureBytes;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
