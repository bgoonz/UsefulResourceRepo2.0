import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { RepoService } from '../../services/repo.service';

import {
    LOAD_REPOS_ACTIONS,
    LoadReposStartAction,
    LoadReposSuccessAction,
    LoadReposFailureAction
} from '../actions/load-repos.actions';

@Injectable()
export class LoadReposEffects {
    constructor(
        private actions: Actions,
        private repoService: RepoService
    ) { }

    @Effect()
    getRepos: Observable<Action> = this.actions
        .ofType(LOAD_REPOS_ACTIONS.LOAD_REPOS_START)
        .switchMap((action: LoadReposStartAction) => {
            console.log('Effect :: ', action);
            return this.repoService.loadReposForUser(action.payload.user)
                .map(result => {
                    const payload = { ...action.payload, repos: result };
                    return new LoadReposSuccessAction(payload);
                })
                .catch(error => {
                    const payload = { ...action.payload, error: error.error };
                    return Observable.of(new LoadReposFailureAction(payload));
                });
        });
}
