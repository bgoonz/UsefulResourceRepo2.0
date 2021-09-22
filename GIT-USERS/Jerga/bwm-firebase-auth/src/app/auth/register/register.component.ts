import { Component, OnInit } from "@angular/core";
import { AuthService } from "../shared/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "bwm-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  formData: any = { username: "Filip" };
  errors: any[] = [];

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    console.log(this.formData);

    this.auth
      .firebaseRegister(this.formData)
      .then((data) => {
        this.router.navigate(["/login", { registered: "success" }]);
      })
      .catch(() => console.error("Cannot Login!"));

    // this.auth.register(this.formData).subscribe(
    //   () => {
    //     this.router.navigate(['/login', {registered: 'success'}]);
    //   },
    //   (errorResponse) => {
    //     this.errors = errorResponse.error.errors;
    //   })
  }
}
