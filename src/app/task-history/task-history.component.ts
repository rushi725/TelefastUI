import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.scss']
})
export class TaskHistoryComponent implements OnInit {

  @Input("value") orderedTasks;
  

  constructor() { }

  ngOnInit() {
  }

}
