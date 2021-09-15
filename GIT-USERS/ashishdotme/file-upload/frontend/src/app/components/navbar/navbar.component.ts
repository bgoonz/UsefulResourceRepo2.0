import { Component, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { takeWhile, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  logoutInProgress: boolean;
  mobileMenuVisible: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onNavbarBurgerClick(): void {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }
}
