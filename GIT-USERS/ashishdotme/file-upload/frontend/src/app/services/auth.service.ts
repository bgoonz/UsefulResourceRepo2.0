import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  API_URL = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  authenticateUser(user): any {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.API_URL + 'users/authenticate', user, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }

  registerUser(user): any {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.API_URL + 'users/register', user, { headers: headers })
      .pipe(map((res) => res));
  }

  pushFileToStorage(file: File, txt: string): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('txt', txt);
    const req = new HttpRequest('POST', this.API_URL + 'users/img', formdata, {
      reportProgress: true,
      responseType: 'text',
    });
    return this.http.request(req);
  }

  getProfile(username): any {
    return this.http.get(this.API_URL + 'users/profile/' + username).pipe(map((res) => res));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
    return this.user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return true;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
