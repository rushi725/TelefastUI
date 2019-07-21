import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { OrderedServiceService } from '../ordered-service.service';
import { ServiceService } from '../service.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-ordered-service-form',
  templateUrl: './ordered-service-form.component.html',
  styleUrls: ['./ordered-service-form.component.scss'],
})
export class OrderedServiceFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private serviceService: ServiceService,
              private orderedServiceService: OrderedServiceService,
              private employeeService: EmployeeService) { }

  @Input('value') project;

  myControl = new FormControl();
  cid = this.myControl.value;
  isSubmitted = false;
  orderedServiceForm: FormGroup;
  errors = {};

  serviceOptions: Array<any> = [];
  managerOptions: Array<any> = [];

  ngOnInit() {
    this.isSubmitted = false;
    this.serviceService.getServicesStream()
      .subscribe((e: any) => {
        this.serviceOptions = e;
      });

    this.employeeService.getEmployeeStream()
      .subscribe((e: any) => {
        this.managerOptions = e;
      });
    this.orderedServiceForm = this.fb.group({
      installationAddress: '',
      progress: 0,
      startDate: '',
      deliveryDate: '',
      serviceStatus: 'NOT_STARTED',
      service: [],
      project: this.project,
      employee: [],
    });
    this.isSubmitted = false;
  }
  handleFormSubmit(event) {
    if (this.orderedServiceForm.valid) {
      const formModel = this.orderedServiceForm.value;
      console.log(formModel);
      this.orderedServiceService.addOrderedServices(formModel);
      this.isSubmitted = true;
    } else {
      console.log('invalid form..');
    }
  }

}
