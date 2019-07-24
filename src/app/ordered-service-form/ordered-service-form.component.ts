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

    this.employeeService.getServiceManagers()
      .subscribe((e: any) => {
        this.managerOptions = e;
      });
    this.orderedServiceForm = this.fb.group({
      installationAddress: '',
      progress: 0,
      startDate: ['',[Validators.required]],
      deliveryDate: ['',[Validators.required]],
      serviceStatus: 'NOT_STARTED',
      service: [],
      project: this.project,
      employee: [],
    },{validator: this.dateLessThan('startDate', 'deliveryDate')});
    this.isSubmitted = false;
    const nameControl1 = this.orderedServiceForm.get('startDate');
    nameControl1.statusChanges
    .subscribe(e=>{
      let today = new Date();
      let date = today.getFullYear()+'-'+(`0${today.getMonth()+1}`)+'-'+today.getDate();
      if(nameControl1.value<date){
        this.errors['startDate']="service cannot start in past";
      }
      else{
        this.errors['startDate']=""
      }
    })
  }
  handleFormSubmit(event) {
    if (this.orderedServiceForm.valid) {
      const formModel = this.orderedServiceForm.value;
      console.log(formModel);
      this.orderedServiceService.addOrderedServices(formModel);
      this.isSubmitted = true;
    } else {
      this.errors["date"]="end date cannot be before start date"
    }
  }
  dateLessThan(from: string, to: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: "Date from should be less than Date to"
        };
      }
      return {};
    }
}
}
