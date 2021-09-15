import { NgModule } from "@angular/core";
import { MapComponent } from "./map.component";
import { AgmCoreModule } from "@agm/core";
import { MapService } from "../../services/map.service";
import { CamelizePipe } from "ngx-pipes";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [MapComponent],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBAp-IE7yjSGvycutmK1Y8zLZ_Htq1TtgU",
    }),
    CommonModule,
  ],
  providers: [MapService, CamelizePipe],
  exports: [MapComponent],
})
export class MapModule {}
