import { unescapeIdentifier } from "@angular/compiler";

export interface ITreeNode {
    path: string;
    mode: string;
    type: string;
    sha: string;
    size: number;
    url: string;
    children: Array<ITreeNode>;
    name: string;
}

export interface IRepoContentState {
    active: boolean;
    content: Array<ITreeNode>;
    error: any;
    user: string;
    repo: string;
}

export const INITIAL_REPO_CONTENT_STATE: IRepoContentState = {
    active: false,
    content: [],
    error: undefined,
    user: '',
    repo: ''
};
