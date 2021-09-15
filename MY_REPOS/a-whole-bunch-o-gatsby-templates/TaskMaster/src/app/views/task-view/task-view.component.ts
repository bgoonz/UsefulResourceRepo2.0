import { Component, OnInit, Input } from '@angular/core';
import { Task } from "../../models/task";
import { Status } from "../../models/task";

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {

  @Input() task: Task;

  unicodeStatuses = {
    [Status.Incomplete]: "\u2610",
    [Status.Complete]: "\u2611"
  }

  constructor() {}

  ngOnInit(): void {
  }

  GetUnicodeStatus(task: Task): string{
    return this.unicodeStatuses[task.status];
  }

  ToggleStatus(task: Task){
    if (task.status == Status.Incomplete)
      task.status = Status.Complete;

    else if(task.status == Status.Complete)
      task.status = Status.Incomplete;
  }

  OpenDetails(event: Event){
    console.log(event);
  }


}
