import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import {HttpService} from '../../services/http/http-service';
import {TokenStorageService} from '../../services/session/token-storage.service';
import {Message} from '../../model/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  usersList: string[] = [];
  greetings: string[] = [];
  messages: Message[] = [];
  name: string;
  private stompClient;
  userName: string;
  message1: string;
  message2: string;
  selectedUser: string;
  textMessage: string;
  connected: boolean = false;

  constructor(private httpService: HttpService,
              private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {

    //todo w trakcie inicjalizacji wykonaj metodę connect

  }

  connect() {
    if (this.userName == null || this.userName === "") {
      alert('Please input a nickname!');
      return;
    }

    this.httpService.connect(this.userName)
      .subscribe(data => {
          console.log(data);
        },
        err => {
          console.error(err);
        });

    const socket = new SockJS('http://localhost:8080/chat');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({username: _this.userName}, function (frame) {
      console.log('Connected: ' + frame);
      _this.stompClient.subscribe('/topic/broadcast', function (output) {});

      _this.stompClient.subscribe('/topic/active', function () {
        _this.updateUsers(_this.userName);
      });

      _this.stompClient.subscribe('/user/queue/messages', function (output) {
        _this.createTextNode(JSON.parse(output.body));
      });

      _this.sendConnection(' connected to server');
      _this.connected = true;
    });
  }

  createTextNode(messageObj: any): void {
    this.messages.push(new Message(messageObj.from, messageObj.recipient, messageObj.text, messageObj.time));
    this.changeDetection.detectChanges();
  }

  disconnect() {
    if (this.stompClient != null) {
      this.sendConnection(' disconnected from server')
      this.stompClient.disconnect();
    }

    this.connected = false;
    console.log('Disconnected!');
  }

  updateUsers(userName: string): void {
    this.httpService.updateChatUsers(userName).subscribe(data=> {
        this.usersList = data;
        // this.usersList = JSON.parse(JSON.stringify(data));
        console.log('received data from updateUsers: ' + this.usersList);
        this.changeDetection.detectChanges();
      },
      error => {
        console.error('update user error: ' + error);
      });
  }

  sendConnection(message: string): void {
    var text = this.userName + message;
    this.sendBroadcast({'from' : 'server', 'text': text});

    // for first time or last time, list active users:
    this.updateUsers(this.userName);
  }

  sendBroadcast(json) {
    this.stompClient.send("/app/broadcast", {}, JSON.stringify(json));
  }

  setSelectedUser(userName) {
    this.selectedUser = userName;
    console.log('Selected user: ' + this.selectedUser);
  }

  send(): void {
    this.stompClient.send("/app/chat", this.userName,
      JSON.stringify({'from': this.userName, 'text': this.textMessage, 'recipient': this.selectedUser}));
  }
}
