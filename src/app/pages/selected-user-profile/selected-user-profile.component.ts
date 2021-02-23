import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http-service';
import {ActivatedRoute} from '@angular/router';
import {UserDetails} from '../../model/user-details';

@Component({
  selector: 'app-selected-user-profile',
  templateUrl: './selected-user-profile.component.html',
  styleUrls: ['./selected-user-profile.component.css']
})
export class SelectedUserProfileComponent implements OnInit {

  selectedUser: UserDetails = new UserDetails();
  retrievedImage: any;
  base64Data: any;

  constructor(private httpService: HttpService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.httpService.getUserDetails(id).subscribe(data => {
      this.selectedUser = JSON.parse(JSON.stringify(data));
        this.base64Data = this.selectedUser.pictureBytes;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      console.log(this.selectedUser);
    },
      error => {
        console.log('Something bad happened while fetching selected user details:' + error);
      })
  }

}
