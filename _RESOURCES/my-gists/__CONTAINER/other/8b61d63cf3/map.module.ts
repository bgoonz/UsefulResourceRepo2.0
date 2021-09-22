import { NgModule } from "@angular/core";
import { AgmCoreModule } from "@agm/core";
import { CommonModule } from "@angular/common";

import { MapComponent } from "./map.component";
import { MapService } from "./map.service";

@NgModule({
  declarations: [MapComponent],
  exports: [MapComponent],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDW9tFSqG2mA0ym2NluRBVGZ6tPr8xbwRM",
    }),
    CommonModule,
  ],
  providers: [MapService],
})
export class MapModule {}
