import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../services/http-service';
import {ExtendedUserDetails} from '../../model/extended-user-details';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  userList: ExtendedUserDetails[];

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.httpService.getAllUsers().subscribe(
      data => {
        this.userList = data;
        //this.base64Data = this.userList.pictureBytes;
        for(let i = 0; i < this.userList.length; i++) {
          this.userList[i].retrievedImage = 'data:image/jpeg;base64,' + this.userList[i].pictureBytes;
        }
        //this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      },
      error => {
        console.log(error);
      });
  }
}
