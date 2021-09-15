import { ChildProcess, spawn } from 'child_process';
import { basename, join, resolve } from 'path';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { config } from '../config';
import { ValidateGit } from './validate';

const repoFolder = resolve('/Users/aparab/Aditya/playground/ddbs');

export function GitClone(repoUrl: string): Observable<string> {
  return ValidateGit().pipe(
    switchMap(() => PerformClone()),
    map((output: string) => output)
  );
}

export function PerformClone(): Observable<string> {
  const RepoCloneSubject = new Subject<string>();
  const repoUrl = config.github.repo;
  const cloneOptions = ['clone', '--progress', repoUrl];

  const cwd = join(repoFolder, basename(repoUrl, ',git'));

  const cloneCommandProcess: ChildProcess = spawn('git', cloneOptions, {
    cwd: repoFolder
  });

  process.stderr.pipe(cloneCommandProcess.stdin);

  cloneCommandProcess.stderr.on('data', (data: string) => {
    if (data.includes('fatal:')) {
      RepoCloneSubject.error(data);
    } else {
      RepoCloneSubject.next(data);
    }
  });

  cloneCommandProcess.stderr.on('close', () => {
    RepoCloneSubject.complete();
  });

  cloneCommandProcess.stderr.on('error', () => {
    console.log('ERROR***');
    RepoCloneSubject.complete();
  });

  cloneCommandProcess.on('close', () => {
    cloneCommandProcess.kill();
  });

  return RepoCloneSubject.asObservable();
}
