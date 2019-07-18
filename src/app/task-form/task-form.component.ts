import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  isSubmitted = false;
  taskForm: FormGroup;
  errors = {};

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: '',
      duration: [],
      approvalNeeded : '',
    });
    this.isSubmitted = false;

    const nameControl = this.taskForm.get('name');
    nameControl.valueChanges
      .subscribe(e => {
         //console.log(e)
      });

    nameControl.statusChanges
      .subscribe(e => {
        if (e === 'INVALID') {
          const errors = nameControl.errors;
          if (errors.required) {
            this.errors['name'] = ' name is required';
          }
          if (errors.minlength) {
            this.errors['name'] = ' name requires min 3 chars';
          }
        } else {
          delete this.errors['name'];
        }
      });


  }
  handleBlur(control) {
    control.setValue(control.value);
  }
  handleFormSubmit(event) {
    if (this.taskForm.valid) {
      const formModel = this.taskForm.value;
      this.taskService.addTask(formModel);
      console.log(formModel);
      this.isSubmitted = true;
      this.router.navigate(['/dashboard'], {
        queryParams: { refresh: new Date().getTime() }
      });
    } else {
      console.log('invalid form..');
    }
  }

}
