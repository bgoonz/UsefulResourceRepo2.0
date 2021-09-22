import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginValue } from '../../../models/login-value';

@Component({
  selector: 'app-login-form',
  animations: [
    trigger('fadeInAndOut', [
      transition('void => *', [style({ opacity: 0 }), animate(500, style({ opacity: 1 }))]),
      transition(':leave', [animate(500, style({ opacity: 0 }))]),
    ]),
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnChanges {
  @Input()
  showLoginError: boolean;
  @Input()
  loginInProgress: boolean;
  @Output()
  submittedLogin: EventEmitter<LoginValue> = new EventEmitter();

  loginForm: FormGroup;

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get emailIsInvalid(): boolean {
    return this.email.invalid && this.email.dirty && this.email.touched;
  }

  get emailTouched(): boolean {
    return this.email.dirty && this.email.touched;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  get passwordIsInvalid(): boolean {
    return this.password.invalid && this.password.dirty && this.password.touched;
  }

  get passwordTouched(): boolean {
    return this.password.dirty && this.password.touched;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showLoginError'] && this.showLoginError) {
      this.password.reset();
    }
  }

  onSubmit(): void {
    const loginValue = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };
    this.submittedLogin.emit(loginValue);
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
}
