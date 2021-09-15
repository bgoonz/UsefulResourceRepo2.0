import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnDestroy,
} from "@angular/core";
import { MapService } from "../../services/map.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() location: string;

  @Input() locationSubject: Subject<any>;

  isPositionError: boolean = false;
  lat: any;
  lng: any;
  constructor(private mapService: MapService, private ref: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.locationSubject) {
      this.locationSubject.subscribe((location: string) => {
        this.getLocation(location);
      });
    }
  }

  getLocation(location) {
    this.mapService.getGeoLocation(location).subscribe(
      (coordinates) => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;
        this.ref.detectChanges();
      },
      () => {
        this.isPositionError = true;
        this.ref.detectChanges();
      }
    );
  }

  mapReadyHandler() {
    this.getLocation(this.location);
  }

  ngOnDestroy() {
    if (this.locationSubject) {
      this.locationSubject.unsubscribe();
    }
  }
}
