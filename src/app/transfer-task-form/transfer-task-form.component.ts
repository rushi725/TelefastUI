import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { OrderedTaskService } from '../ordered-task.service';

@Component({
  selector: 'app-transfer-task-form',
  templateUrl: './transfer-task-form.component.html',
  styleUrls: ['./transfer-task-form.component.scss']
})
export class TransferTaskFormComponent implements OnInit {

  @Input('value') orderedTask;


  myControl = new FormControl();
  employees: any[] = [];
  transferTaskForm: FormGroup;
  errors = {};
  teamManagerId = 14;
  teamId = 4;

  isSubmitted = false;

  constructor(private fb: FormBuilder,
              private employeeService: EmployeeService,
              private orderedTaskService: OrderedTaskService) { }

  ngOnInit() {

    this.transferTaskForm = this.fb.group({
      teamMember: ''
    });

    this.employeeService.getAvailableEmployees(this.teamId)
    .subscribe((response: any) => {
      this.employees = response;
      this.employees = this.employees.filter(e => e.firstName !== this.orderedTask.employee.firstName);
    });


    this.isSubmitted = false;
    const teamMemberControl = this.transferTaskForm.get('teamMember');
    teamMemberControl.valueChanges
      .subscribe(e => {
        // console.log(e)
      });

    teamMemberControl.statusChanges
      .subscribe(e => {
        if (e === 'INVALID') {
          const errors = teamMemberControl.errors;
          if (errors.required) {
            this.errors['teamMember'] = ' teamMember is required';
          }
          if (errors.minlength) {
            this.errors['teamMember'] = ' teamMember requires min 3 chars';
          }
        } else {
          delete this.errors['teamMember'];
        }
      });


  }
  handleBlur(control) {
    control.setValue(control.value);
  }

  handleFormSubmit(event) {
    if (this.transferTaskForm.valid) {
      const employee = this.transferTaskForm.value;
      this.isSubmitted = true;

      // have to pass manager id for getting tasks by manager id

      this.orderedTaskService.transferTaskToEmployeeId(this.orderedTask.orderTaskId, employee.teamMember.id, this.teamManagerId);

    } else {
      console.log('invalid form..');
    }
  }

}
