import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/internal/operators/map";

@Injectable({
  providedIn: "root",
})
export class ImageUploadService {
  private rootURL = "http://localhost:3001/api/image-upload";
  constructor(private httpClient: HttpClient) {}

  public uploadImage(image: File): Observable<string | any> {
    const formData = new FormData();

    formData.append("image", image);
    return this.httpClient
      .post(this.rootURL, formData)
      .pipe(map((json: any) => json.imageUrl));
  }
}
