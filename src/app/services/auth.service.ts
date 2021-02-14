import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

const AUTH_API = 'http://localhost:8080/api/auth/';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  register(formData: FormData): Observable<any> {
    return this.http.post(AUTH_API + 'signup', formData);
  }

  login(formData: FormData): Observable<any> {
    return this.http.post(AUTH_API + 'signin', formData).pipe(catchError((err: HttpErrorResponse) => {
      console.error(err);

      //Handle the error here

      return throwError(err);    //Rethrow it back to component
    }));
  }
}
