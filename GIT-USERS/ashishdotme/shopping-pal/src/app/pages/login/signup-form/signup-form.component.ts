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
import { SignupValue } from '../../../models/signup-value';

@Component({
  selector: 'app-signup-form',
  animations: [
    trigger('fadeInAndOut', [
      transition('void => *', [style({ opacity: 0 }), animate(500, style({ opacity: 1 }))]),
      transition(':leave', [animate(500, style({ opacity: 0 }))]),
    ]),
  ],
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit, OnChanges {
  @Input()
  showSignupError: boolean;
  @Input()
  signupInProgress: boolean;
  @Output()
  submittedSignup: EventEmitter<SignupValue> = new EventEmitter();

  signupForm: FormGroup;

  get email(): FormControl {
    return this.signupForm.get('email') as FormControl;
  }

  get emailIsInvalid(): boolean {
    return this.email.invalid && this.email.dirty && this.email.touched;
  }

  get emailTouched(): boolean {
    return this.email.dirty && this.email.touched;
  }

  get password(): FormControl {
    return this.signupForm.get('password') as FormControl;
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
    if (changes['showSignupError'] && this.showSignupError) {
      this.password.reset();
    }
  }

  onSubmit(): void {
    const signupValue = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      username: this.signupForm.value.username,
      password: this.signupForm.value.password,
      timezone: 'Asia/Kolkata',
    };
    this.submittedSignup.emit(signupValue);
  }

  private initForm(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      username: ['', [Validators.required, Validators.minLength(1)]],
      name: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
}
