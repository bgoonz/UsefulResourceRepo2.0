export interface ITreeNode {
    path: string;
    mode: string;
    type: string;
    sha: string;
    size: number;
    url: string;
    children: Array<ITreeNode>;
    name: string;
    text?: string;
    value?: any;
}

export interface IRepoContent {
    sha: string;
    tree: Array<ITreeNode>;
    truncated: boolean;
    url: string;
}

export interface IRepoContentState {
    active: boolean;
    content: IRepoContent;
    error: any;
    user: string;
    repo: string;
}

export const INITIAL_REPO_CONTENT_STATE: IRepoContentState = {
    active: false,
    content: undefined,
    error: undefined,
    user: '',
    repo: ''
};
