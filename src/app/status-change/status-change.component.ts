import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  // @Input()
  statusForm: FormGroup;
  status: Status[] = [
    { value: 'PENDING', viewValue: 'Pending' },
    { value: 'COMPLETED', viewValue: 'Completed' },
    { value: 'INPROGRESS', viewValue: 'In Progress' }
  ];

  ngOnInit() {
    this.statusForm = this.fb.group({
      status: ['']
    });



    const statusControl = this.statusForm.get('status');
    statusControl.valueChanges
      .subscribe(e => {
        console.log(e);
      });

  }

  handleFormSubmit(event) {
      const formModel = this.statusForm.value;
      console.log(formModel);
  }
}
