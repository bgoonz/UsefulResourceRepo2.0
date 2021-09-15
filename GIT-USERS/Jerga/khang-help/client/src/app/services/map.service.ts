import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { CamelizePipe } from "ngx-pipes";

@Injectable({
  providedIn: "root",
})
export class MapService {
  private geoCoder;
  private locationCache: any = {};
  constructor(private camelizePipe: CamelizePipe) {}

  private camelize(value: string): string {
    return this.camelizePipe.transform(value);
  }

  private cacheLocation(location: string, coordinates: any) {
    this.locationCache[this.camelize(location)] = coordinates;
  }

  private isLocationCached(location): any {
    return this.locationCache[this.camelize(location)];
  }

  private geocodeLocation(location: string): Observable<any> {
    return new Observable((observer) => {
      this.geoCoder.geocode({ address: location }, (result, status) => {
        if (status === "OK") {
          const geometry = result[0].geometry.location;

          const coordinates = { lat: geometry.lat(), lng: geometry.lng() };

          this.cacheLocation(location, coordinates);
          observer.next(coordinates);
        } else {
          observer.error("Location could not be geocoded");
        }
      });
    });
  }

  public getGeoLocation(location: string): Observable<any> {
    if (!this.geoCoder) {
      this.geoCoder = new (<any>window).google.maps.Geocoder();
    }

    if (this.isLocationCached(location)) {
      // return location from cache
      // return of is same with observer.next
      return of(this.locationCache(this.camelize(location)));
    } else {
      return this.geocodeLocation(location);
    }
  }
}
