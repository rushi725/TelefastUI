import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {

  serviceForm: FormGroup;
  errors = {};
  isSubmitted = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private service: ServiceService) {}

  ngOnInit() {
    this.serviceForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ''
    });


    this.isSubmitted = false;
    const nameControl = this.serviceForm.get('name');
    nameControl.valueChanges
      .subscribe(e => {
         // console.log(e)
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
    if (this.serviceForm.valid) {
      const formModel = this.serviceForm.value;
      this.service.addService(formModel);
      console.log(formModel);
      this.isSubmitted = true;
    } else {
      console.log('invalid form..');
    }
  }

}
