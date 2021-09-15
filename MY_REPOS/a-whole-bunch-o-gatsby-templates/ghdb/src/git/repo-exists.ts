import { ChildProcess, exec } from 'child_process';
import { join, resolve } from 'path';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { config } from '../config';
import { ValidateGit } from './validate';

export function GitRepoExists(): Observable<boolean> {
  return ValidateGit().pipe(
    map(() => config.github.repoPath),
    switchMap((base: string) => DoesGitRepoExists()),
    map((data: boolean) => data)
  );
}

export function DoesGitRepoExists(): Observable<boolean> {
  const gitRepoExistsSubject = new Subject<boolean>();

  const cwd = resolve(
    join(config.github.repoPath, config.github.repoFolderName)
  );

  const gitRepoExistsProcess: ChildProcess = exec('git remote', { cwd });

  gitRepoExistsProcess.stdout.on('data', () => {
    gitRepoExistsSubject.next(true);
  });

  gitRepoExistsProcess.stderr.on('data', (data: string) => {
    gitRepoExistsSubject.error(false);
  });

  gitRepoExistsProcess.on('error', (error: string) => {
    gitRepoExistsSubject.next(false);
  });

  gitRepoExistsProcess.on('close', () => {
    gitRepoExistsSubject.complete();
    gitRepoExistsProcess.kill();
  });

  return gitRepoExistsSubject.asObservable();
}
