import { Action } from '@ngrx/store';
import { IRepoContentState } from '../models/repo-files.model';

export const LOAD_REPO_CONTENT_ACTIONS = {
    LOAD_REPO_CONTENT_START: 'LOAD_REPO_CONTENT_START',
    LOAD_REPO_CONTENT_SUCCESS: 'LOAD_REPO_CONTENT_SUCCESS',
    LOAD_REPO_CONTENT_FAILURE: 'LOAD_REPO_CONTENT_FAILURE'
};

export class LoadRepoContentStartAction implements Action {
    readonly type: string = LOAD_REPO_CONTENT_ACTIONS.LOAD_REPO_CONTENT_START;
    constructor(public payload: IRepoContentState) { }
}

export class LoadRepoContentSuccessAction implements Action {
    readonly type: string = LOAD_REPO_CONTENT_ACTIONS.LOAD_REPO_CONTENT_SUCCESS;
    constructor(public payload: IRepoContentState) { }
}

export class LoadRepoContentFailureAction implements Action {
    readonly type: string = LOAD_REPO_CONTENT_ACTIONS.LOAD_REPO_CONTENT_FAILURE;
    constructor(public payload: IRepoContentState) { }
}

export type LOAD_REPO_CONTENT_ACTION_TYPES
    = LoadRepoContentStartAction
    | LoadRepoContentSuccessAction
    | LoadRepoContentFailureAction;
