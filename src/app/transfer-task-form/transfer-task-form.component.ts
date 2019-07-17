import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transfer-task-form',
  templateUrl: './transfer-task-form.component.html',
  styleUrls: ['./transfer-task-form.component.scss']
})
export class TransferTaskFormComponent implements OnInit {

   myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
   transferTaskForm: FormGroup;
   errors = {};
  isSubmitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.transferTaskForm = this.fb.group({
      teamMember: ''
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
      const formModel = this.transferTaskForm.value;
      console.log(formModel);
      this.isSubmitted = true;
    } else {
      console.log('invalid form..');
    }
  }

}
