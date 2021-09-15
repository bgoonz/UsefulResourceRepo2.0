import { createSelector } from '@ngrx/store';
import { LOAD_REPO_CONTENT_ACTIONS, LOAD_REPO_CONTENT_ACTION_TYPES } from '../actions/repo-files.actions';
import { INITIAL_REPO_CONTENT_STATE, IRepoContentState, ITreeNode } from '../models/repo-files.model';

export function LoadRepoContentReducer(
    state: IRepoContentState = INITIAL_REPO_CONTENT_STATE,
    action: LOAD_REPO_CONTENT_ACTION_TYPES
): IRepoContentState {
    switch (action.type) {
        case LOAD_REPO_CONTENT_ACTIONS.LOAD_REPO_CONTENT_START:
            return { ...state, active: true, user: action.payload.user, repo: action.payload.repo, content: undefined, error: undefined };
        case LOAD_REPO_CONTENT_ACTIONS.LOAD_REPO_CONTENT_SUCCESS:
            return { ...state, active: false, content: action.payload.content, error: undefined };
        case LOAD_REPO_CONTENT_ACTIONS.LOAD_REPO_CONTENT_FAILURE:
            return { ...state, active: false, content: undefined, error: action.payload.error };
        default:
            return { ...state };
    }
}

export const getRepoContent = state => state.repoContentState.content;
export const getRepoContentState = state => state.repoContentState;
export const getActive = state => state.repoContentState.active;
export const getError = state => state.repoContentState.error;

export const selectRepoContentStateActiveFlag = createSelector(
    getActive,
    (state: boolean) => !state
);

export const selectRepoContentStateError = createSelector(
    getError,
    (state: IRepoContentState) => state
);

export const selectRepoContentStateContent = createSelector(
    getRepoContent,
    (repoContent: Array<ITreeNode>) => {
        console.log(repoContent);
        return repoContent;
    }
);

export const selectRepoContentState = createSelector(
    getRepoContentState,
    (repoContent: IRepoContentState) => repoContent
);
