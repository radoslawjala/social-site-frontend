import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8080/api/users/';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) { }

  getUserDetails(id: string): Observable<string> {
    return this.httpClient.get<string>(API_URL + id);
  }
}
