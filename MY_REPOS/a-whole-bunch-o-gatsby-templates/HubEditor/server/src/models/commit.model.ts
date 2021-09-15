
export interface IAuthor {
    login: string;
    id: number;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface ITree {
    sha: string;
    url: string;
}

export interface IVerification {
    payload: string;
    reason: string;
    signature: string;
    verified: boolean;
}

export interface IParent extends ITree {
    html_url: string;
}

export interface IChildCommit {
    author: IAuthor;
    comment_count: number;
    committer: IAuthor;
    message: string;
    tree: ITree;
    url: string;
    verification: IVerification;
}

export interface ICommit {
    author: IAuthor;
    comments_url: string;
    commit: IChildCommit;
    committer: IAuthor;
    html_url: string;
    parents: Array<IParent>;
    sha: string;
    url: string;
}
