import { HttpErrorResponse } from "@angular/common/http";

export const exctractApiError = (
  resError: HttpErrorResponse
): BwmApi.Error[] => {
  let errors = [{ title: "Error!", detail: "Ooops, something went wrong!" }];
  if (resError && resError.error && resError.error.errors) {
    errors = resError.error.errors;
  }

  return errors;
};
