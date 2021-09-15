import { Injectable } from '@angular/core';
import { Task } from './models/task';
import { TASKS } from './hero-list-stub';

@Injectable({
  providedIn: 'root'
})
export class TaskGetterService {

  constructor() { }


  static GetTasks(): Task[]{
    return TASKS;
  }


}
