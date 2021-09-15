import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MonacoFile } from 'ngx-monaco';

import { IFileContentState, IFileContent } from '../../store/models/file-contents.model';
import {
  selectFileContentState,
  selectFileContentStateActive,
  selectFileContentStateContent,
  selectFileContentStateError
} from '../../store/reducers/file-content.reducer';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.styl']
})
export class CodeEditorComponent implements OnInit {

  @HostBinding('class')
  className = 'f c';

  fileContentState$: Observable<IFileContentState>;
  fileContentState: IFileContentState;

  file: MonacoFile;

  constructor(
    store: Store<IFileContentState>
  ) {
    store.select(selectFileContentState).subscribe((state: IFileContentState) => {
      this.fileContentState = state;
      this.file = {
        content: this.fileContentState.file ? this.fileContentState.file.content : '',
        language: this.getFileType(this.fileContentState.file ? this.fileContentState.file.name : ''),
        uri: this.fileContentState.file ? this.fileContentState.file.url : ''
      };
    });
  }

  ngOnInit() {
  }

  getFileType(fileName: string): string {
    const ext = fileName.split('.').pop();
    switch (ext) {
      case 'ts':
        return 'typescript';
      case 'json':
        return 'json';
      case 'js':
        return 'javascript';
      case 'html':
        return 'html';
      default:
        return 'text';
    }
  }

}
