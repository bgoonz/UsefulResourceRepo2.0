import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImageUploadComponent } from "./image-upload.component";
import { ImageUploadService } from "src/app/services/image-upload.service";

import { ImageCropperModule } from "ngx-image-cropper";
import { ToastrModule } from "ngx-toastr";
@NgModule({
  imports: [CommonModule, ImageCropperModule, ToastrModule],
  exports: [ImageUploadComponent],
  declarations: [ImageUploadComponent],
  providers: [ImageUploadService],
})
export class ImageUploadModule {}
