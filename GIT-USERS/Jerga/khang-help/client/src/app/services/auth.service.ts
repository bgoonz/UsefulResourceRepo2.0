import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as jwt from "jsonwebtoken";
import * as moment from "moment";
import { JwtHelperService } from "@auth0/angular-jwt";

const jwt = new JwtHelperService();

class DecodedToken {
  exp: number = 0;
  username: string = "";
}

@Injectable()
export class AuthService {
  private readonly rootURL = "http://localhost:3001/api/users";
  private decodedToken;

  constructor(private httpClient: HttpClient) {
    this.decodedToken =
      JSON.parse(localStorage.getItem("rental_decoded")) || new DecodedToken();
  }
  private saveToken(token: any): any {
    this.decodedToken = jwt.decodeToken(token);

    localStorage.setItem("rental_auth", token);
    localStorage.setItem("rental_decoded", JSON.stringify(this.decodedToken));

    return token;
  }

  private getExpiration() {
    return moment.unix(this.decodedToken.exp);
  }

  public register(userData: any): Observable<any> {
    return this.httpClient.post(this.rootURL + "/register", userData);
  }

  public login(userData: any): Observable<any> {
    return this.httpClient.post(this.rootURL + "/login", userData).pipe(
      map((token) => {
        return this.saveToken(token);
      })
    );
  }

  public logOut() {
    localStorage.removeItem("rental_auth");
    localStorage.removeItem("rental_decoded");

    this.decodedToken = new DecodedToken();
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  public getUserName(): string {
    return this.decodedToken.username;
  }

  public getUserId(): string {
    return this.decodedToken.userId;
  }

  public getAuthToken(): string {
    return localStorage.getItem("rental_auth");
  }
}
