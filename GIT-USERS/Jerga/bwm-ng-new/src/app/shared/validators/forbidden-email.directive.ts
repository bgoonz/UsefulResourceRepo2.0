import { Directive, Input } from "@angular/core";
import { Validator, NG_VALIDATORS, AbstractControl } from "@angular/forms";
import { forbiddenEmailValidator } from "./functions";

// TODO: Explain providers!
@Directive({
  selector: "[forbiddenEmail]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenEmailDirective,
      multi: true,
    },
  ],
})
export class ForbiddenEmailDirective implements Validator {
  @Input("forbiddenEmail") forbiddenEmail: string;

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.forbiddenEmail
      ? forbiddenEmailValidator(this.forbiddenEmail)(control)
      : null;
  }
}
