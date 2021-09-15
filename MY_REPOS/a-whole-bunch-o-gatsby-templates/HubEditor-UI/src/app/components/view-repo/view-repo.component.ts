import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { IAppState, getRepoContentState } from '../../store';
import { IRepoContentState } from '../../store/models/repo-files.model';
import { LoadRepoContentStartAction } from '../../store/actions/repo-files.actions';

@Component({
  selector: 'app-view-repo',
  templateUrl: './view-repo.component.html',
  styleUrls: ['./view-repo.component.styl']
})
export class ViewRepoComponent implements OnInit {
  @HostBinding('class')
  className = 'f r';

  repoContentState$: Observable<IRepoContentState>;
  repoContentState: IRepoContentState;

  constructor(
    private route: ActivatedRoute,
    private store: Store<IAppState>
  ) {
    this.repoContentState$ = store.select(getRepoContentState);
    this.repoContentState$.subscribe(state => {
      this.repoContentState = state;
      console.log(state.content);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(({ user, repo }) => {
      const newState = { ...this.repoContentState, user, repo };
      this.store.dispatch(new LoadRepoContentStartAction(newState));
    });
  }

}
