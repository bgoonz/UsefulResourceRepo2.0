import { LOAD_REPO_CONTENT_ACTIONS, LOAD_REPO_CONTENT_ACTION_TYPES } from '../actions/repo-files.actions';
import { INITIAL_REPO_CONTENT_STATE, IRepoContentState } from '../models/repo-files.model';

export function LoadRepoContentReducer(
    state: IRepoContentState = INITIAL_REPO_CONTENT_STATE,
    action: LOAD_REPO_CONTENT_ACTION_TYPES
): IRepoContentState {
    switch (action.type) {
        case LOAD_REPO_CONTENT_ACTIONS.LOAD_REPO_CONTENT_START:
            return { ...state, active: true, user: action.payload.user, repo: action.payload.repo, content: [], error: undefined };
        case LOAD_REPO_CONTENT_ACTIONS.LOAD_REPO_CONTENT_SUCCESS:
            return { ...state, active: false, content: action.payload.content, error: undefined };
        case LOAD_REPO_CONTENT_ACTIONS.LOAD_REPO_CONTENT_FAILURE:
            return { ...state, active: false, content: [], error: action.payload.error };
        default:
            return { ...state };
    }
}

export const selectRepoContent = state => state.repoContentState.content;
export const selectRepoContentState = state => state.repoContentState;
