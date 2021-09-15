import { readJson } from 'fs-extra';
import { join, resolve } from 'path';
import { Observable, Subject } from 'rxjs';

import { config } from '../config';

class DataServiceInjectable {
  private jsonData: any;

  public get json(): any {
    return this.jsonData;
  }

  public set json(v: any) {
    this.jsonData = v;
  }

  public cacheData(): Observable<any> {
    const cacheDataSubject = new Subject<any>();
    const dataJsonPath = resolve(
      join(config.github.repoPath, config.github.repoFolderName, 'data.json')
    );

    readJson(dataJsonPath)
      .then((data: any) => {
        this.json = data;
        cacheDataSubject.next(data);
      })
      .catch((error: any) => {
        this.json = undefined;
        cacheDataSubject.error(error);
      });

    return cacheDataSubject.asObservable();
  }
}

export const DataService = new DataServiceInjectable();
