import { router } from './router';
import { Request, Response, Next } from 'restify';
import axios, { AxiosPromise, AxiosResponse, AxiosError } from 'axios';
import { IRepo, IRepoContent, ICommit, ITreeNode, IFileContent } from '../../models/';

import { buildTree } from '../../utils/tree-builder';


function retriveUserRepos(user: string): AxiosPromise<Array<IRepo>> {
    return axios.get<Array<IRepo>>(`https://api.github.com/users/${user}/repos`);
}

function retrieveLatestCommit(user: string, repo: string): AxiosPromise<ICommit> {
    return axios.get<ICommit>(`https://api.github.com/repos/${user}/${repo}/commits/master`);
}

function retrieveFileTree(user: string, repo: string, sha: string): AxiosPromise<Array<ITreeNode>> {
    return axios.get<Array<ITreeNode>>(`https://api.github.com/repos/${user}/${repo}/git/trees/${sha}?recursive=1`);
}

function retriveRepoContent(user: string, repo: string, path: string): AxiosPromise<Array<IRepoContent>> {
    return axios.get<Array<IRepoContent>>(`https://api.github.com/repos/${user}/${repo}/contents/${path}`);
}

function retrieveFileContent(user: string, repo: string, path: string): AxiosPromise<IFileContent> {
    console.log(`https://api.github.com/repos/${user}/${repo}/contents/${path}`);
    return axios.get<IFileContent>(`https://api.github.com/repos/${user}/${repo}/contents/${path}`);
}

router.get('/repos/:user', (req: Request, res: Response, next: Next) => {
    const { user } = req.params;
    retriveUserRepos(user)
        .then((response: AxiosResponse) => {
            res.json(response.data);
        })
        .catch((error: AxiosError) => {
            const { data, status } = error.response!;
            res.status(status);
            res.send(data);
        });
});

router.get('/repos/files/:user/:repo', (req: Request, res: Response, next: Next) => {
    const { user, repo } = req.params;
    retrieveLatestCommit(user, repo)
        .then((response1: AxiosResponse) => {
            const latestCommit = <ICommit>response1.data;
            retrieveFileTree(user, repo, latestCommit.sha)
                .then((response: AxiosResponse) => {
                    const fileTree = response.data;
                    const resp = <Array<ITreeNode>>buildTree(fileTree.tree);
                    res.json({ ...fileTree, tree: resp });
                });
        });

});

router.get('/repos/files/content/:user/:repo', (req: Request, res: Response, next: Next) => {
    const { user, repo } = req.params;
    const { path } = req.query;
    retrieveFileContent(user, repo, path)
        .then((response: AxiosResponse) => {
            const fileContent = <IFileContent>response.data;
            const file = Buffer.from(fileContent.content, fileContent.encoding).toString();
            const data = { ...response.data, content: file };
            res.json(data);
        });
});

export const repoRoutes = router;
