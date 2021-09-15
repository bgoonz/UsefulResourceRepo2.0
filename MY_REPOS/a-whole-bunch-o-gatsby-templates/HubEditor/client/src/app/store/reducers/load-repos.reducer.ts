import { INITIAL_REPOS_STATE, IRepoState } from '../models/repo.model';
import { LOAD_REPOS_ACTION_TYPES, LOAD_REPOS_ACTIONS } from '../actions/load-repos.actions';

export function LoadReposReducer(
    state: IRepoState = INITIAL_REPOS_STATE,
    action: LOAD_REPOS_ACTION_TYPES
): IRepoState {
    switch (action.type) {
        case LOAD_REPOS_ACTIONS.LOAD_REPOS_START:
            return { ...state, active: true, user: action.payload.user, repos: [], error: undefined };
        case LOAD_REPOS_ACTIONS.LOAD_REPOS_SUCCESS:
            return { ...state, active: false, repos: action.payload.repos };
        case LOAD_REPOS_ACTIONS.LOAD_REPOS_FAILURE:
            return { ...state, active: false, repos: [], error: action.payload.error };
        default:
            return { ...state };
    }
}

export const selectUserRepos = state => state.reposState.repos;
export const selectRepos = state => state.reposState;
