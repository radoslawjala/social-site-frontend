import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../services/session/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  welcomeString = 'Welcome to Social site';

  constructor(private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {
    if(this.tokenStorage.getUser() != null) {
     // console.log('User: ' + this.tokenStorage.getToken())
    }
  }
}
