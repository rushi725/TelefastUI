import { OrderedTaskService } from '../ordered-task.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ordered-task-detail',
  templateUrl: './ordered-task-detail.component.html',
  styleUrls: ['./ordered-task-detail.component.scss']
})
export class OrderedTaskDetailComponent implements OnInit {

  taskInfo:Array<any>=[];
  employeeId=5;

  constructor(private orderedTaskService:OrderedTaskService) { }
  
  ngOnInit() {
    this.orderedTaskService.getOrderedTaskInfoByEmployeeId(this.employeeId)
    .subscribe((response:any)=>{
      this.taskInfo = response;
      console.log("inside subscribe()")
      console.log(this.taskInfo);
    })
  }

}
