import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http/http-service';
import {AllUserListUserDetails} from '../../model/all-user-list-user-details';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  userList: AllUserListUserDetails[];

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.httpService.getAllUsers().subscribe(
      data => {
        this.userList = data;
        for(let i = 0; i < this.userList.length; i++) {
          this.userList[i].retrievedImage = 'data:image/jpeg;base64,' + this.userList[i].pictureBytes;
        }
      },
      error => {
        console.log(error);
      });
  }
}
