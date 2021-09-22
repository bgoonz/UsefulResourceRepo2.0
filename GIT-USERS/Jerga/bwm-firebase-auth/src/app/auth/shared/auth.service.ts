import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import * as moment from "moment";
import "rxjs/Rx";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireDatabase } from "@angular/fire/database";

const jwt = new JwtHelperService();

class DecodedToken {
  exp: number = 0;
  username: string = "";
}

@Injectable()
export class AuthService {
  private decodedToken;
  private user;
  private authState = null;

  constructor(
    private http: HttpClient,
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase
  ) {
    this.afAuth.authState.subscribe((auth) => {
      if (auth) {
        this.db
          .object(`/users/${auth.uid}`)
          .snapshotChanges()
          .subscribe((action) => {
            this.user = action.payload.val();
          });
        this.authState = auth;
      } else {
        this.authState = null;
      }
    });
    // this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken();
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user
  get currentUser(): any {
    return this.authenticated ? this.user : null;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : "";
  }

  public isAuthenticated(): boolean {
    return this.authState !== null;
  }

  public firebaseRegister(userData) {
    const { email, password, username } = userData;
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = { email, username };
        return this.db.object(`/users/${user.uid}`).set(newUser);
      });
  }

  public signInWithEmailAndPassword(userData) {
    const { email, password } = userData;
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public logout() {
    this.afAuth.auth.signOut();
  }

  // OLD FUNCTIONALITY -------------------------------

  private saveToken(token: string): string {
    this.decodedToken = jwt.decodeToken(token);

    localStorage.setItem("bwm_auth", token);
    localStorage.setItem("bwm_meta", JSON.stringify(this.decodedToken));

    return token;
  }

  private getExpiration() {
    return moment.unix(this.decodedToken.exp);
  }

  public register(userData: any): Observable<any> {
    return this.http.post("api/v1/users/register", userData);
  }

  public login(userData: any): Observable<any> {
    return this.http
      .post("api/v1/users/auth", userData)
      .pipe(map((token: string) => this.saveToken(token)));
  }

  // public logout() {
  //   localStorage.removeItem('bwm_auth');
  //   localStorage.removeItem('bwm_meta');

  //   this.decodedToken = new DecodedToken();
  // }

  // public isAuthenticated(): boolean {
  //   return moment().isBefore(this.getExpiration());
  //   return this.authState !== null;
  // }

  public getAuthToken(): string {
    return localStorage.getItem("bwm_auth");
  }

  public getUsername(): string {
    return this.user ? this.user.username : "";
  }

  // public getUsername(): string {
  //   return this.decodedToken.username;
  // }

  public getUserId(): string {
    return this.decodedToken.userId;
  }
}
