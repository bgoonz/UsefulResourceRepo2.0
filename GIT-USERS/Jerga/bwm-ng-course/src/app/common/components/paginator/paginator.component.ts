import { Component, Input, Output, EventEmitter } from "@angular/core";
import * as _ from "lodash";

@Component({
  selector: "app-paginator",
  templateUrl: "paginator.component.html",
  styleUrls: ["paginator.component.scss"],
})
export class PaginatorComponent {
  private initialPageView = 1;

  @Input() public pageSize = 5;

  @Input() public pagesToShow = 10;

  @Input() set entitiesCount(totalItems: number) {
    this.initPagination(totalItems);
  }

  @Output() public pageUpdated = new EventEmitter();

  public pagesViewCount: number;

  @Input() public currentPage = 1;

  public startPage = 1;

  public endPage: number;

  public lowerPageLimit: number;

  public upperPageLimit: number;

  public totalPages: number;

  public pages: number[];

  public isPagination = true;

  public updatePager(): void {
    if (this.currentPage <= this.upperPageLimit + 1) {
      this.startPage = 1;
      this.endPage = this.pagesViewCount;
    } else if (this.currentPage + this.upperPageLimit >= this.totalPages) {
      this.startPage = this.totalPages - (this.pagesViewCount - 1);
      this.endPage = this.totalPages;
    } else {
      this.startPage = this.currentPage - this.lowerPageLimit;
      this.endPage = this.currentPage + this.upperPageLimit;
    }

    this.pages = _.range(this.startPage, this.endPage + 1);
  }

  public initPagination(totalItems: number): void {
    this.pagesViewCount = this.pagesToShow;

    if (totalItems <= this.pageSize) {
      this.isPagination = false;
      return;
    }

    this.totalPages = Math.ceil(totalItems / this.pageSize);

    if (this.totalPages < this.pagesViewCount) {
      this.pagesViewCount = this.totalPages;
    }

    this.endPage = this.totalPages;

    if (this.pagesViewCount % 2 === 0) {
      this.lowerPageLimit = this.pagesViewCount / 2 - 1;
      this.upperPageLimit = this.lowerPageLimit + 1;
    } else {
      this.lowerPageLimit = Math.floor(this.pagesViewCount / 2);
      this.upperPageLimit = this.lowerPageLimit;
    }

    this.isPagination = true;
    this.updatePager();
  }

  public setPage(page: any): void {
    if (page <= 1) {
      this.initialPageView = this.currentPage = 1;
      this.updateAndEmitPaginator();
      return;
    }

    this.initialPageView = this.currentPage =
      page > this.totalPages ? this.totalPages : parseInt(page, 10);
    this.updateAndEmitPaginator();
  }

  public updateAndEmitPaginator(): void {
    this.updatePager();
    this.pageUpdated.emit(this.currentPage);
  }

  public validateNumber(event: any): void {
    const pattern: any = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // Reset Pagination, maybe you will need it (:
  public resetPaginator(): void {
    this.currentPage = 1;
    this.updatePager();
  }
}
