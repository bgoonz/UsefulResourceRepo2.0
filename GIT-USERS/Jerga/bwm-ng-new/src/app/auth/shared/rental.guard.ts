import { Injectable } from "@angular/core";
import {
  CanActivate,
  RouterStateSnapshot,
  Router,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { RentalService } from "src/app/rental/shared/rental.service";
import { Observable, of as observableOf } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RentalGuard implements CanActivate {
  constructor(private rentalService: RentalService, private router: Router) {}

  // /rentals/:rentalId/edit
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const { rentalId } = route.params;

    return this.rentalService.verifyRentalOwner(rentalId).pipe(
      map((_) => true),
      catchError((_) => {
        this.router.navigate(["/rentals"]);
        return observableOf(false);
      })
    );
  }
}
