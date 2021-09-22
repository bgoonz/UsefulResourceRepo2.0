import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PaginatorComponent } from "./paginator.component";

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [PaginatorComponent],
  declarations: [PaginatorComponent],
})
export class PaginatorModule {}
