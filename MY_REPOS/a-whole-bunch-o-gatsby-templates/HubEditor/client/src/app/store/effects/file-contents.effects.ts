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
    LOAD_FILE_CONTENT_ACTIONS,
    LoadFileContentStartAction,
    LoadFileContentSuccessAction,
    LoadFileContentFailuretAction
} from '../actions/file-content.actions';

@Injectable()
export class LoadFileContentEffects {
    constructor(
        private actions$: Actions,
        private repoService: RepoService
    ) { }

    @Effect()
    loadFileContent: Observable<Action> = this.actions$
        .ofType(LOAD_FILE_CONTENT_ACTIONS.LOAD_FILE_CONTENT_START)
        .switchMap((action: LoadFileContentStartAction) =>
            this.repoService.loadFileContents(action.payload.user, action.payload.repo, action.payload.filepath)
                .map(fileContent => new LoadFileContentSuccessAction({ ...action.payload, file: fileContent }))
                .catch(error => Observable.of(new LoadFileContentFailuretAction({ ...action.payload, error })))
        );
}
