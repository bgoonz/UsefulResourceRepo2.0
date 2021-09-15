import { Action } from '@ngrx/store';
import { IRepoState } from '../models/repo.model';

export const LOAD_REPOS_ACTIONS = {
    LOAD_REPOS_START: 'LOAD_REPOS_START',
    LOAD_REPOS_SUCCESS: 'LOAD_REPOS_SUCCESS',
    LOAD_REPOS_FAILURE: 'LOAD_REPOS_FAILURE'
};

export class LoadReposStartAction implements Action {
    readonly type: string = LOAD_REPOS_ACTIONS.LOAD_REPOS_START;
    constructor(public payload: IRepoState) { }
}

export class LoadReposSuccessAction implements Action {
    readonly type: string = LOAD_REPOS_ACTIONS.LOAD_REPOS_SUCCESS;
    constructor(public payload: IRepoState) { }
}

export class LoadReposFailureAction implements Action {
    readonly type: string = LOAD_REPOS_ACTIONS.LOAD_REPOS_FAILURE;
    constructor(public payload: IRepoState) { }
}

export type LOAD_REPOS_ACTION_TYPES
    = LoadReposStartAction
    | LoadReposSuccessAction
    | LoadReposFailureAction;
