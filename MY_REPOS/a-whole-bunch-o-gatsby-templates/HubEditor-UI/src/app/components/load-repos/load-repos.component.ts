import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { IRepoState } from '../../store/models/repo.model';
import { getReposState } from '../../store';

import { LoadReposStartAction } from '../../store/actions/load-repos.actions';

@Component({
  selector: 'app-load-repos',
  templateUrl: './load-repos.component.html',
  styleUrls: ['./load-repos.component.styl']
})
export class LoadReposComponent implements OnInit {

  @HostBinding('class')
  className = 'f c';

  repos: IRepoState;

  user = '';

  constructor(
    private store: Store<IRepoState>
  ) {
    this.store.select(getReposState)
      .subscribe(data => {
        this.repos = data;
      });
  }

  ngOnInit() {
  }

  loadRepos() {
    const payload = { ...this.repos, user: this.user };
    this.store.dispatch(new LoadReposStartAction(payload));
  }

}
