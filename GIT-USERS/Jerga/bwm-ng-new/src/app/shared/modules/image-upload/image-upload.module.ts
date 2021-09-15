import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImageUploadComponent } from "./image-upload.component";
import { SpinnerModule } from "../spinner/spinner.module";
import { ImageCropperModule } from "ngx-image-cropper";

@NgModule({
  declarations: [ImageUploadComponent],
  exports: [ImageUploadComponent],
  imports: [CommonModule, SpinnerModule, ImageCropperModule],
})
export class ImageUploadModule {}
