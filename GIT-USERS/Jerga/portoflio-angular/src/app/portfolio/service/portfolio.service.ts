import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { Repo } from "./repo.model";

@Injectable()
export class PortfolioService {
  constructor(private http: Http) {}

  public getRepos(): Observable<Repo[]> {
    return this.http
      .get(
        "https://api.github.com/users/jerga99/repos?client_id=881b73034a3d06490d09_secret=f61af3892e72aba65de1e329699cdd7810ae2883"
      )
      .map((res: Response) => this.mapJsonToRepos(res.json()));
  }

  private mapJsonToRepos(json: any): Repo[] {
    const repos: Repo[] = [];

    json.forEach((record) => {
      const repo = new Repo();

      repo.name = record["name"];
      repo.link = record["clone_url"];
      repo.date = record["created_at"];
      repo.language = record["language"];
      repos.push(repo);
    });

    return repos;
  }
}
