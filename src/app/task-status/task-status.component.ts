import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatusService } from '../status.service';
import { OrderedTaskService } from '../ordered-task.service';
import { VirtualTimeScheduler } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss']
})
export class TaskStatusComponent implements OnInit {

  constructor(private orderedTaskService: OrderedTaskService,
              private userService: UserService) { }
  employee = this.userService.getEmployee();
  employeeId = this.employee.id;
  taskInfo: Array<any> = [];
  currentTask;

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
