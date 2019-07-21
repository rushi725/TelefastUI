import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StatusService } from '../status.service';
import { OrderedTaskService } from '../ordered-task.service';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss']
})
export class TaskStatusComponent implements OnInit {

  employeeId = 64;
  taskInfo: any = {};
  constructor(private orderedTaskService: OrderedTaskService) { }

  ngOnInit() {

    this.orderedTaskService.getOrderedTaskInfoByEmployeeId(this.employeeId)

    this.orderedTaskService.getTaskInfoStream()
    .subscribe((response:any)=>{
      this.taskInfo = response;
    })
    }

    ngDoCheck(){
      this.taskInfo = this.orderedTaskService.getOrderedTaskInfo();
    }
  }
