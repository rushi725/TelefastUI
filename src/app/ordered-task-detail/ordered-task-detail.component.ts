import { OrderedTaskService } from '../ordered-task.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ordered-task-detail',
  templateUrl: './ordered-task-detail.component.html',
  styleUrls: ['./ordered-task-detail.component.scss']
})
export class OrderedTaskDetailComponent implements OnInit {

  @Input("value") currentTask;
  isTaskAssigned=false;
  taskInfo:Array<any>=[];
  constructor(private orderedTaskService:OrderedTaskService) { }
  
  ngOnInit() {

    
  }

}
