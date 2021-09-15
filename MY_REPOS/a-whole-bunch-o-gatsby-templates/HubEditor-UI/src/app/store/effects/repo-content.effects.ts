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
    LOAD_REPO_CONTENT_ACTIONS,
    LoadRepoContentStartAction,
    LoadRepoContentSuccessAction,
    LoadRepoContentFailureAction
} from '../actions/repo-files.actions';

@Injectable()
export class LoadRepoContentEffects {
    constructor(
        private actions: Actions,
        private repoService: RepoService
    ) { }

    @Effect()
    loadRepoContent: Observable<Action> = this.actions
        .ofType(LOAD_REPO_CONTENT_ACTIONS.LOAD_REPO_CONTENT_START)
        .switchMap((action: LoadRepoContentStartAction) =>
            this.repoService.loadRepoContents(action.payload.user, action.payload.repo)
                .map(response => new LoadRepoContentSuccessAction({ ...action.payload, content: response }))
                .catch(error => Observable.of(new LoadRepoContentFailureAction({ ...action.payload, error })))
        );
}
