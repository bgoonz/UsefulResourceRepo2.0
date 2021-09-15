import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IRepo } from '../store/models/repo.model';
import { ITreeNode, IRepoContent } from '../store/models/repo-files.model';
import { IFileContent } from '../store/models/file-contents.model';

@Injectable()
export class RepoService {
    private API_END_POINT = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    loadReposForUser(user: string): Observable<Array<IRepo>> {
        return this.http.get<Array<IRepo>>(`${this.API_END_POINT}/repos/${user}`)
            .map(response => response);
    }

    loadRepoContents(user: string, repo: string): Observable<IRepoContent> {
        return this.http.get<IRepoContent>(`${this.API_END_POINT}/repos/files/${user}/${repo}`);
    }

    loadFileContents(user: string, repo: string, path: string): Observable<IFileContent> {
        return this.http.get<IFileContent>(`${this.API_END_POINT}/repos/files/content/${user}/${repo}?path=${path}`);
    }
}
