import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IRepoContentState, ITreeNode } from '../../store/models/repo-files.model';
import { IFileContentState } from '../../store/models/file-contents.model';
import { Observable } from 'rxjs/Observable';
import { IAppState } from '../../store';

import { TreeviewItem, TreeviewConfig, TreeItem } from 'ngx-treeview';

import {
  selectRepoContentStateActiveFlag,
  selectRepoContentStateContent,
  selectRepoContentStateError,
  selectRepoContentState
} from '../../store/reducers/repo-content.reducer';

import { LoadRepoContentStartAction } from '../../store/actions/repo-files.actions';
import { LoadFileContentFailuretAction, LoadFileContentStartAction } from '../../store/actions/file-content.actions';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.styl']
})
export class FileExplorerComponent implements OnInit {
  @HostBinding('class')
  className = 'sidebar';

  @Input('user')
  user: string;

  @Input('repo')
  repo: string;

  repoContentStateContent$: Observable<Array<ITreeNode>>;
  repoContentStateActive$: Observable<boolean>;
  repoContentStateError$: Observable<any>;

  repoContentState: IRepoContentState;
  fileContentState: IFileContentState;

  options = {};

  items: Array<any>;
  nodes: Array<ITreeNode> = [];

  constructor(
    private store: Store<IAppState>
  ) {
    this.repoContentStateActive$ = store.select(selectRepoContentStateActiveFlag);
    this.repoContentStateContent$ = store.select(selectRepoContentStateContent);
    this.repoContentStateError$ = store.select(selectRepoContentStateError);
    store.subscribe((state: IAppState) => {
      this.repoContentState = state.repoContentState;
      this.fileContentState = state.fileContent;
      if (state.repoContentState.content) {
        this.nodes = state.repoContentState.content.tree;
      }
      console.log(this.nodes);
    });
  }

  ngOnInit() {
    const actionPayload = { ...this.repoContentState };

    actionPayload.user = this.user;
    actionPayload.repo = this.repo;

    console.log(actionPayload);
    this.store.dispatch(new LoadRepoContentStartAction(actionPayload));
  }

  loadFile(node: ITreeNode) {
    console.log(node);
    const fileContent = { ...this.fileContentState };
    fileContent.user = this.user;
    fileContent.repo = this.repo;
    fileContent.filepath = node.path;
    console.log(fileContent);
    this.store.dispatch(new LoadFileContentStartAction(fileContent));
  }

  onSelect({ node }) {
    const dataModel = <ITreeNode>node.data;
    this.loadFile(dataModel);
  }

}
