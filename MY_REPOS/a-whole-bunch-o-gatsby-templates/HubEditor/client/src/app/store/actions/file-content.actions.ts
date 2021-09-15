import { Action } from '@ngrx/store';
import { IFileContentState } from '../models/file-contents.model';

export const LOAD_FILE_CONTENT_ACTIONS = {
    LOAD_FILE_CONTENT_START: 'LOAD_FILE_CONTENT_START',
    LOAD_FILE_CONTENT_SUCCESS: 'LOAD_FILE_CONTENT_SUCCESS',
    LOAD_FILE_CONTENT_FAILURE: 'LOAD_FILE_CONTENT_FAILURE'
};

export class LoadFileContentStartAction implements Action {
    readonly type: string = LOAD_FILE_CONTENT_ACTIONS.LOAD_FILE_CONTENT_START;
    constructor(public payload: IFileContentState) { }
}

export class LoadFileContentSuccessAction implements Action {
    readonly type: string = LOAD_FILE_CONTENT_ACTIONS.LOAD_FILE_CONTENT_SUCCESS;
    constructor(public payload: IFileContentState) { }
}

export class LoadFileContentFailuretAction implements Action {
    readonly type: string = LOAD_FILE_CONTENT_ACTIONS.LOAD_FILE_CONTENT_FAILURE;
    constructor(public payload: IFileContentState) { }
}

export type LOAD_FILE_CONTENT_ACTION_TYPES
    = LoadFileContentStartAction
    | LoadFileContentSuccessAction
    | LoadFileContentFailuretAction;
