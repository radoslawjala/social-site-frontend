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
        console.log(this.userList);
      },
      error => {
        console.log(error);
      });
  }
}
