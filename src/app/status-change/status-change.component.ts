import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  status: Status[] = [
    { value: 'PENDING', viewValue: 'Pending' },
    { value: 'COMPLETED', viewValue: 'Completed' },
    { value: 'INPROGRESS', viewValue: 'In Progress' }
  ];

  ngOnInit() {
  }

}
