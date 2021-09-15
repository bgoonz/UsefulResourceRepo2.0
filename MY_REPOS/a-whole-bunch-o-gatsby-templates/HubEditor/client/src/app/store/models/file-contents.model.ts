export interface ILinks {
    self: string;
    git: string;
    html: string;
}

export interface IFileContent {
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string;
    type: string;
    content: string;
    encoding: string;
    _links: ILinks;
}

export interface IFileContentState {
    active: boolean;
    file: IFileContent;
    error: any;
    user: string;
    repo: string;
    filepath: string;
}

export const INITIAL_FILE_CONTENT_STATE: IFileContentState = {
    active: false,
    file: undefined,
    error: undefined,
    user: '',
    repo: '',
    filepath: ''
};
