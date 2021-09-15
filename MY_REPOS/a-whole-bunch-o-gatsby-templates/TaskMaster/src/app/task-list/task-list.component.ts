import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { Status } from '../models/task';
import { TaskGetterService } from '../task-getter.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tasks: Task[] = TaskGetterService.GetTasks();


}
