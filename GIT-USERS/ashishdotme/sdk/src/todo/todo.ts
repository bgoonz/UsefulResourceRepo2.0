/**
 *
 * Ashish Patel
 * e: ashishsushilPatel@gmail.com
 * w: https://ashish.me
 *
 */

export interface TodoRequest {
  content: string;
  due_datetime?: string;
  project_id?: string;
}

export interface TodoResponse {
  _id: string;
  content: string;
  due_datetime: string;
  project_id: number;
  todoId: number;
  completed: boolean;
  date: string;
  completedDate?: string;
}
