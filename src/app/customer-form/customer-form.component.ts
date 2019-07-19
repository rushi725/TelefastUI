import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  isSubmitted = false;
  taskForm: FormGroup;
  errors = {};

  constructor(private fb: FormBuilder,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      address: '',
      contactNo:''
    });
    this.isSubmitted = false;

    const firstNameControl = this.taskForm.get('firstName');
    firstNameControl.valueChanges
      .subscribe(e => {
         //console.log(e)
      });

      const lastNameControl = this.taskForm.get('lastName');
      lastNameControl.valueChanges
        .subscribe(e => {
           //console.log(e)
        });

    firstNameControl.statusChanges
      .subscribe(e => {
        if (e === 'INVALID') {
          const errors = firstNameControl.errors;
          if (errors.required) {
            this.errors['firstName'] = ' This field is required';
          }
          if (errors.minlength) {
            this.errors['lastName'] = ' This field requires min 3 chars';
          }
        } else {
          delete this.errors['fisrtName'];
        }
      });

      lastNameControl.statusChanges
      .subscribe(e => {
        if (e === 'INVALID') {
          const errors = lastNameControl.errors;
          if (errors.required) {
            this.errors['lastName'] = ' This field is required';
          }
          if (errors.minlength) {
            this.errors['lastName'] = ' This field requires min 3 chars';
          }
        } else {
          delete this.errors['lastName'];
        }
      });


  }
  handleBlur(control) {
    control.setValue(control.value);
  }
  handleFormSubmit(event) {
    if (this.taskForm.valid) {
      const formModel = this.taskForm.value;
      this.customerService.addCustomer(formModel);
      console.log(formModel);
      this.isSubmitted = true;
    } else {
      console.log('invalid form..');
    }
  }


}
