import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';

import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-resource-search',
  templateUrl: './resource-search.component.html',
  styleUrls: ['./resource-search.component.scss'],
})
export class ResourceSearchComponent implements AfterViewInit {
  @ViewChild('searchInput') input: ElementRef;

  @Output() onSearch = new EventEmitter<string>();

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(debounceTime(200))
      .subscribe((e: any) => {
        this.onSearch.emit(e.target.value);
      });
  }
}
