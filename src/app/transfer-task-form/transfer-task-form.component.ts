import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { OrderedTaskService } from '../ordered-task.service';
import { UserService } from '../user.service';

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
  teamManagerId;
  teamId;
  employee;

  isSubmitted = false;

  constructor(private fb: FormBuilder,
    private employeeService: EmployeeService,
    private orderedTaskService: OrderedTaskService,
    private userService: UserService) { }

  ngOnInit() {

    this.transferTaskForm = this.fb.group({
      teamMember: ''
    });
    this.employee = this.userService.getEmployee();
    this.teamManagerId = this.employee.id;
    this.teamId = this.employee.team.id;

    this.employeeService.getAvailableEmployees(this.teamId)
      .subscribe((response: any) => {
        this.employees = response;
        if (this.orderedTask.employee) {
          this.employees = this.employees.filter(e => e.firstName !== this.orderedTask.employee.firstName);
        }
        else {
          this.employees = response;
        }
      });

    // this.employeeService.getEmployeeStream()
    // .subscribe((response:any)=>{
    //   this.employees=response;
    // })


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
