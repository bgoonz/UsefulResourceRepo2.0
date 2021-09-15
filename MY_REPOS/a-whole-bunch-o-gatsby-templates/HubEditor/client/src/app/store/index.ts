import { ActionReducerMap, createSelector } from '@ngrx/store';

import { IRepoState } from './models/repo.model';
import { IRepoContentState } from './models/repo-files.model';
import { IFileContentState } from './models/file-contents.model';

import * as reposReducer from './reducers/load-repos.reducer';
import * as repoContentReducer from './reducers/repo-content.reducer';
import * as fileContentReducer from './reducers/file-content.reducer';

export interface IAppState {
    reposState: IRepoState;
    repoContentState: IRepoContentState;
    fileContent: IFileContentState;
}

export const reducers: ActionReducerMap<IAppState> = {
    reposState: reposReducer.LoadReposReducer,
    repoContentState: repoContentReducer.LoadRepoContentReducer,
    fileContent: fileContentReducer.LoadFileContentReducer
};

export const getUserRepos = createSelector(
    reposReducer.selectUserRepos,
    (repos: IRepoState) => repos.repos
);

export const getReposState = createSelector(
    reposReducer.selectRepos,
    (repos: IRepoState) => repos
);

export const getFileContentState = createSelector(
    fileContentReducer.getFileContentState,
    (fileContent: IFileContentState) => fileContent
);
