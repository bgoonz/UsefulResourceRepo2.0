import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError, of as observableOf } from "rxjs";
import { map as pipeMap, catchError } from "rxjs/operators";
import tt from "@tomtom-international/web-sdk-maps";

interface TomResponse {
  summary: { [key: string]: any };
  results: { [key: string]: any }[];
}

interface GeoPosition {
  lat: number;
  lon: number;
}

@Injectable({
  providedIn: "root",
})
export class MapService {
  private locationCache: { [key: string]: GeoPosition } = {};

  constructor(private http: HttpClient) {}

  getGeoPosition(location: string, apiKey: string): Observable<GeoPosition> {
    const cachedLocation = this.getCachedLocation(location);

    return cachedLocation
      ? observableOf(cachedLocation)
      : this.requestGeoLocation(location, apiKey);
  }

  private requestGeoLocation(
    location: string,
    apiKey: string
  ): Observable<GeoPosition> {
    return this.http
      .get(
        `https://api.tomtom.com/search/2/geocode/${location}.JSON?key=${apiKey}`
      )
      .pipe(
        pipeMap((tomRes: TomResponse) => {
          const results = tomRes.results;
          if (results && results.length > 0) {
            const { position } = results[0];
            this.cacheLocation(location, position);
            return position;
          }

          throw this.locationError;
        }),
        catchError((_) => throwError(this.locationError))
      );
  }

  createMap(options) {
    return tt.map({
      key: options.apiKey,
      container: "bwm-map",
      style: "tomtom://vector/1/basic-main",
      zoom: 15,
      scrollZoom: false,
    });
  }

  initMap(map: any, position: GeoPosition) {
    this.centerMap(map, position);
    this.addMarkerToMap(map, position);
  }

  centerMap(map: any, position: GeoPosition) {
    map.setCenter(new tt.LngLat(position.lon, position.lat));
  }

  addMarkerToMap(map: any, position: GeoPosition) {
    this.removePreviousMarkers();
    const markerDiv = document.createElement("div");
    markerDiv.className = "bwm-marker";

    new tt.Marker({
      element: markerDiv,
    })
      .setLngLat([position.lon, position.lat])
      .addTo(map);
  }

  addPopupToMap(map: any, message: string) {
    this.removePreviousPopups();
    new tt.Popup({
      className: "bwm-popup",
      closeButton: false,
      closeOnClick: false,
    })
      .setLngLat(new tt.LngLat(0, 0))
      .setHTML(`<p>${message}</p>`)
      .addTo(map);
  }

  private getCachedLocation(location: string): GeoPosition {
    const locationKey = this.normalizeLocation(location);
    return this.locationCache[locationKey];
  }

  private cacheLocation(location: string, position: GeoPosition) {
    const locationKey = this.normalizeLocation(location);
    this.locationCache[locationKey] = position;
  }

  private normalizeLocation(location: string) {
    return location.replace(/\s/g, "").toLowerCase();
  }

  private get locationError() {
    return new Error("Location not found!");
  }

  private removePreviousPopups() {
    this.removeElementByClass("bwm-popup");
  }

  private removePreviousMarkers() {
    this.removeElementByClass("bwm-marker");
  }

  private removeElementByClass(className) {
    const elements = document.getElementsByClassName(className);

    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }
}
