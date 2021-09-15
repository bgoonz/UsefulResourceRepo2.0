export interface Task {
  id: number;
  description: string;
  status: Status;
}

export enum Status {
  Incomplete,
  Complete,
  InProgress
}
