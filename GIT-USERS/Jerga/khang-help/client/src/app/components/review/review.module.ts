import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserService } from "../../services/user.service";

import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "../../services/auth.service";
import { FormsModule } from "@angular/forms";
import { ReviewComponent } from "src/app/components/review/review.component";
import { ReviewService } from "src/app/services/review.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { StarRatingModule } from "angular-star-rating";

@NgModule({
  declarations: [ReviewComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    StarRatingModule.forRoot(),
  ],
  providers: [ReviewService, UserService, AuthService],
  exports: [ReviewComponent],
})
export class ReviewModule {}
