import { ChildProcess, exec } from 'child_process';
import { Observable, Subject } from 'rxjs';

export function ValidateGit(): Observable<string> {
  const ValidateGitSubject = new Subject<string>();

  const GIT_COMMAND = 'git';

  const GitCommandExecution: ChildProcess = exec(GIT_COMMAND);

  GitCommandExecution.stderr.on('data', (error: string) => {
    ValidateGitSubject.error('Git Command Not Found. Please Install Git');
  });

  GitCommandExecution.stdout.on('data', (output: string) => {
    ValidateGitSubject.next(output);
  });

  GitCommandExecution.on('close', () => {
    ValidateGitSubject.complete();
  });

  return ValidateGitSubject.asObservable();
}
