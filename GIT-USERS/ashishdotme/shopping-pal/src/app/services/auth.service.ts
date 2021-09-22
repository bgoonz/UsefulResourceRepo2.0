import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  API_URL = 'https://stark-temple-11768.herokuapp.com/api/';
  constructor(private http: HttpClient) {}

  authenticateUser(user): any {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(this.API_URL + 'Users/login', user, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }

  getProfile(token, userId): any {
    this.loadToken();
    const headers = new HttpHeaders({
      Authorization: token,
      'Content-Type': 'application/json',
    });

    return this.http
      .get(this.API_URL + 'Users/' + userId, { headers: headers })
      .pipe(map((res) => res));
  }

  getCategories(): any {
    this.loadToken();
    const headers = new HttpHeaders({
      Authorization: this.authToken,
      'Content-Type': 'application/json',
    });
    return this.http.get(this.API_URL + 'Categories').pipe(map((res) => res));
  }

  postCategory(category): any {
    this.loadToken();
    const headers = new HttpHeaders({
      Authorization: this.authToken,
      'Content-Type': 'application/json',
    });
    return this.http
      .post(this.API_URL + 'Categories', category, { headers: headers })
      .pipe(map((res) => res));
  }

  deleteCategory(id) {
    this.loadToken();
    const headers = new HttpHeaders({
      Authorization: this.authToken,
      'Content-Type': 'application/json',
    });
    return this.http
      .delete(this.API_URL + 'Categories/' + id, {
        headers: headers,
      })
      .pipe(map((res) => res));
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
    return localStorage.getItem('id_token') !== null;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
