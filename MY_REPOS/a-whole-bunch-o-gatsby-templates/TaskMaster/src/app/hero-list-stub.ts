import { Task } from './models/task';
import { Status } from './models/task';

export const TASKS: Task[] = [
  { id: 1, description: "do some dishes", status: Status.Incomplete },
  { id: 2, description: "walk the dog", status: Status.Incomplete },
  { id: 3, description: "read a book", status: Status.Incomplete },
  { id: 4, description: "shower", status: Status.Complete },
  { id: 5, description: "go to the store", status: Status.Incomplete },


]
