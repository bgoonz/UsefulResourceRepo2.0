getLocation(location) {
    this.mapService.getGeoLocation(location).subscribe(
      (coordinates: any) => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;

        this.ref.detectChanges();
      }, (error: string) => {
        console.error(error);
      });
  }

  mapReadyHandler() {
  	this.getLocation(this.location);
  }