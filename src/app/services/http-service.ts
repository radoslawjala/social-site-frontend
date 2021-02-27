import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AllUserListUserDetails} from '../model/all-user-list-user-details';
import {UserPost} from '../model/post';

const API_URL = 'http://localhost:8080/api/users/';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) { }

  getUserDetails(id: string): Observable<string> {
    return this.httpClient.get<string>(API_URL + id);
  }

  getAllUsers(): Observable<AllUserListUserDetails[]> {
    return this.httpClient.get<AllUserListUserDetails[]>(API_URL);
  }

  addPost(formData: FormData): Observable<any> {
    return this.httpClient.post(API_URL + 'add-post', formData);
  }

  getUserPosts(id: string): Observable<UserPost[]> {
    return this.httpClient.get<UserPost[]>(API_URL + 'userPosts/' + id);
  }
}
