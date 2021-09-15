import { createSelector } from '@ngrx/store';
import { LOAD_FILE_CONTENT_ACTION_TYPES, LOAD_FILE_CONTENT_ACTIONS } from '../actions/file-content.actions';
import { INITIAL_FILE_CONTENT_STATE, IFileContentState, IFileContent } from '../models/file-contents.model';

export function LoadFileContentReducer(
    state: IFileContentState = INITIAL_FILE_CONTENT_STATE,
    action: LOAD_FILE_CONTENT_ACTION_TYPES
): IFileContentState {
    switch (action.type) {
        case LOAD_FILE_CONTENT_ACTIONS.LOAD_FILE_CONTENT_START:
            return { ...state, active: true, user: action.payload.user, repo: action.payload.repo, filepath: action.payload.filepath, file: undefined, error: undefined };
        case LOAD_FILE_CONTENT_ACTIONS.LOAD_FILE_CONTENT_SUCCESS:
            return { ...state, active: false, file: action.payload.file };
        case LOAD_FILE_CONTENT_ACTIONS.LOAD_FILE_CONTENT_FAILURE:
            return { ...state, active: false, file: undefined, error: action.payload.error };
        default:
            return { ...state };
    }
}

export const getFileContentState = state => state.fileContent;
export const getFileContentStateActive = state => state.fileContent.active;
export const getFileContentStateContent = state => state.fileContent.file;
export const getFileContentStateError = state => state.fileContent.error;

export const selectFileContentState = createSelector(
    getFileContentState,
    (state: IFileContentState) => state
);

export const selectFileContentStateActive = createSelector(
    getFileContentStateActive,
    (state: boolean) => !state
);

export const selectFileContentStateContent = createSelector(
    getFileContentStateContent,
    (state: IFileContent) => {
        console.log(state);
        return state;
    }
);

export const selectFileContentStateError = createSelector(
    getFileContentStateError,
    (state: any) => state
);
