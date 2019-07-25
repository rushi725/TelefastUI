import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatusService } from '../status.service';
import { OrderedTaskService } from '../ordered-task.service';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss']
})
export class TaskStatusComponent implements OnInit {

  employeeId = 6;
  taskInfo: Array<any> = [];
  currentTask;
  constructor(private orderedTaskService: OrderedTaskService) { }

  ngOnInit() {

    this.orderedTaskService.getOrderedTaskInfoByEmployeeId(this.employeeId)
    .subscribe((response: any) => {
      this.taskInfo = response;
      this.currentTask = this.taskInfo.find(e => {
        return e.taskStatus !== 'COMPLETED';
    });
    });

    this.orderedTaskService.getTaskInfoStream()
    .subscribe((response: any) => {
      this.taskInfo = response;
      this.currentTask = this.taskInfo.find(e => {

        return e.taskStatus !== 'COMPLETED';
    });
    });

    }

  }
