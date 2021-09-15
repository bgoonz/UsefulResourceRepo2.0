import { ILinks } from './repo-links.model';

export interface IRepoContent {
    name: string;
    path: string;
    sha: string;
    size: string;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string;
    type: string;
    _links: ILinks;
}
