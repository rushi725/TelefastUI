import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StatusService } from '../status.service';
import { Subscriber } from 'rxjs';
import { OrderedTaskService } from '../ordered-task.service';

export interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-status-change',
  templateUrl: './status-change.component.html',
  styleUrls: ['./status-change.component.scss']
})
export class StatusChangeComponent implements OnInit {

  @Input('value') employeeId;
  taskInfo: any = {};


  Status: Array<any> = [];

  constructor(private fb: FormBuilder,
              private statusService: StatusService,
              private orderedTaskService: OrderedTaskService) { }


  statusForm: FormGroup;

  ngOnInit() {

    this.orderedTaskService.getOrderedTaskInfoByEmployeeId(this.employeeId);

    this.orderedTaskService.getTaskInfoStream()
    .subscribe((response: any) => {
      this.taskInfo = response;
    });

    this.statusService.getStatus()
      .subscribe((response: any) => {
        this.Status = response;
      });

    this.statusForm = this.fb.group({
      status: ['']
    });

    const statusControl = this.statusForm.get('status');
    statusControl.valueChanges
      .subscribe(e => {
        console.log(e);
      });

  }

  ngDoCheck() {
    this.taskInfo = this.orderedTaskService.getOrderedTaskInfo();
  }

  handleFormSubmit(event) {
    // this.taskInfo = this.orderedTaskService.getOrderedTaskInfo();

    const statusObject = this.statusForm.value;

    const orderedTaskId = this.taskInfo.orderedTask.orderTaskId;

    this.orderedTaskService.changeTaskStatus(this.employeeId, orderedTaskId, statusObject.status);

  }
}
