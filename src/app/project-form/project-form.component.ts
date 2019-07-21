import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TaskService } from '../task.service';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectService } from '../project.service';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  
  myControl = new FormControl();

  projectManager={
    "id":5
  }

  cid = this.myControl.value;
  isSubmitted = false;
  customerForm: FormGroup;
  customerOptions: Array<any> = [];

  errors = {};

  constructor(private fb: FormBuilder,
    private customeService:CustomerService,
    private activatedRoute: ActivatedRoute,
    private projectService:ProjectService) { }

  ngOnInit() {

    this.customeService.loadCustomers();

    this.customeService.getCustomerStream()
    .subscribe((e:any)=>{
      this.customerOptions=e;
      console.log("inside project form subscribe()---->")
      console.log(this.customerOptions);
    })

    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      // desc: '',
      projectManager:'',
      customer:'',
      startDate:'',
      deliveryDate:''
    });
    this.isSubmitted = false;

    const nameControl = this.customerForm.get('name');
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

  ngDoCheck(){
    this.customerOptions = this.customeService.getCustomerList();
  }

  handleBlur(control) {
    control.setValue(control.value);
  }
  handleFormSubmit(event) {
    if (this.customerForm.valid) {
      const formModel = this.customerForm.value;
      this.isSubmitted = true;
      this.projectService.addProject(formModel);
      
    } else {
      console.log('invalid form..');
    }
  }

}
