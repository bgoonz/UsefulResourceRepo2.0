import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: any = {};
  categories: any[];
  placeholderString = 'Select timezone';
  timezone: any;

  categoriesForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
    this.user = this.authService.getUser();
    console.log(this.user);
  }

  onSubmit() {
    const signupValue = {
      name: this.categoriesForm.value.name,
      description: this.categoriesForm.value.description,
    };
    this.authService.postCategory(signupValue).subscribe((data) => {
      this.getCategories();
    });
  }

  getCategories() {
    this.authService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  deleteCategory(id) {
    this.authService.deleteCategory(id).subscribe((data) => {
      this.getCategories();
    });
  }

  private initForm(): void {
    this.categoriesForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      description: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
}
