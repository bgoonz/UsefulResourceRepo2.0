import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { LoginValue } from '../../models/login-value';
import { SignupValue } from '../../models/signup-value';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  showLoginError: boolean;
  loginInProgress: boolean;
  showSignupError: boolean;
  signupInProgress: boolean = false;
  loginText: string = "Don't you have an account? Sign up now!";
  showScreen: any = {
    login: true,
    signup: false,
  };
  private viewAlive: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.viewAlive = true;
    this.toHomePageIfAlreadyLoggedIn();
  }

  ngOnDestroy(): void {
    this.viewAlive = false;
  }

  login(loginValue: LoginValue): void {
    this.loginInProgress = true;
    this.authService.authenticateUser(loginValue).subscribe((data) => {
      this.loginInProgress = false;
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['home']);
      } else {
        this.showLoginError = !data.success;
      }
    });
  }

  signup(signupValue: SignupValue): void {
    this.signupInProgress = true;
    this.authService.registerUser(signupValue).subscribe((data) => {
      this.signupInProgress = false;
      if (data.success) {
        this.showToggle();
      } else {
        this.showLoginError = !data.success;
      }
    });
  }

  showToggle() {
    if (this.showScreen.login) {
      this.loginText = 'Already have an account? Log in now!';
      this.showScreen.signup = true;
      this.showScreen.login = false;
    } else {
      this.loginText = "Don't you have an account? Sign up now!";
      this.showScreen.signup = false;
      this.showScreen.login = true;
    }
  }

  private toHomePageIfAlreadyLoggedIn(): void {
    if (this.authService.loggedIn()) {
      this.router.navigate(['/home']);
    }
  }
}
