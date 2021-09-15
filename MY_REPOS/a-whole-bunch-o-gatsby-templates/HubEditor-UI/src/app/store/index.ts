import { ActionReducerMap, createSelector } from '@ngrx/store';
import { IRepoState } from './models/repo.model';
import { IRepoContentState } from './models/repo-files.model';
import * as reposReducer from './reducers/load-repos.reducer';
import * as repoContentReducer from './reducers/repo-content.reducer';

export interface IAppState {
    reposState: IRepoState;
    repoContentState: IRepoContentState;
}

export const reducers: ActionReducerMap<IAppState> = {
    reposState: reposReducer.LoadReposReducer,
    repoContentState: repoContentReducer.LoadRepoContentReducer
};

export const getUserRepos = createSelector(
    reposReducer.selectUserRepos,
    (repos: IRepoState) => repos.repos
);

export const getReposState = createSelector(
    reposReducer.selectRepos,
    (repos: IRepoState) => repos
);

export const getRepoContent = createSelector(
    repoContentReducer.selectRepoContent,
    (repoContent: IRepoContentState) => repoContent.content
);

export const getRepoContentState = createSelector(
    repoContentReducer.selectRepoContentState,
    (repoContent: IRepoContentState) => repoContent
);
