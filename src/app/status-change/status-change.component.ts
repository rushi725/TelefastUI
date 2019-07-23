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

  @Input("value") currentTask;
  taskInfo: Array<any> = [];


  Status: Array<any> = [];

  constructor(private fb: FormBuilder,
              private statusService: StatusService,
              private orderedTaskService: OrderedTaskService) { }


  statusForm: FormGroup;

  ngOnInit() {

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
      });

  }

  handleFormSubmit(event) {
    const statusObject = this.statusForm.value;
    console.log(statusObject.status);
    this.orderedTaskService.changeTaskStatus(this.currentTask, statusObject.status);
  }
}
