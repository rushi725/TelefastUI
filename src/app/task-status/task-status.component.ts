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

  employeeId = 119;
  taskInfo: Array<any> = [];
  currentTask;
  constructor(private orderedTaskService: OrderedTaskService) { }

  ngOnInit() {

    this.orderedTaskService.getOrderedTaskInfoByEmployeeId(this.employeeId)
    .subscribe((response:any)=>{
      this.taskInfo = response;
      console.log(this.taskInfo)
      this.currentTask = this.taskInfo.find(e =>{
        console.log(e.taskStatus);
        
        return e.taskStatus!=="COMPLETED"
    })
    console.log(this.currentTask)
    })

    this.orderedTaskService.getTaskInfoStream()
    .subscribe((response:any)=>{
      this.taskInfo = response;
      console.log(this.taskInfo)
      this.currentTask = this.taskInfo.find(e =>{
        console.log(e.taskStatus);
        
        return e.taskStatus!=="COMPLETED"
    })
    console.log(this.currentTask)
    })

    }

    // ngDoCheck(){
    //   this.orderedTaskService.getTaskInfoStream()
    //   .subscribe((response:any)=>{
    //     this.taskInfo = response;
    //     console.log(this.taskInfo)
    //     this.currentTask = this.taskInfo.find(e =>{
    //       console.log(e.taskStatus);
          
    //       return e.taskStatus!=="COMPLETED"
    //   })
    //   console.log(this.currentTask)
    //   })
  
    // }
  }
