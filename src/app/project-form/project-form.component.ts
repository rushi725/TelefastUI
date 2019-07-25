import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectService } from '../project.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  @Input('value') projectManagerId;
  invalidForm=''
  myControl = new FormControl();

  projectManager = {
    'id': 5
  };

  cid = this.myControl.value;
  isSubmitted = false;
  projectForm: FormGroup;
  customerOptions: Array<any> = [];

  errors = {};
  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              private activatedRoute: ActivatedRoute,
              private projectService: ProjectService) { }

  ngOnInit() {

     this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      const refresh = paramMap.get('refresh');
      if (refresh) {
        this.customerService.getCustomerStream()
          .subscribe((e: any) => {
            this.customerOptions = e;
            console.log(this.customerOptions);
          });
      }
    });
     this.customerService.getCustomers();

     this.customerService.getCustomerStream()
    .subscribe((e: any) => {
      this.customerOptions = e;
    });

     this.customerService.getCustomerStream2()
     .subscribe((e: any) => this.customerOptions = e);

     this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      // desc: '',
      progress: 0,
      status: 'NOT_STARTED',
      customer: ['',Validators.required],
      startDate: ['',Validators.required],
      deliveryDate:[ '',[Validators.required]],
      description: ['',[Validators.required]],
      projectManager: {id: this.projectManagerId}
    }, {validator: this.dateLessThan('startDate', 'deliveryDate')});
     this.isSubmitted = false;

     const nameControl = this.projectForm.get('name');
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
      const nameControl1 = this.projectForm.get('startDate');
      nameControl1.valueChanges
      .subscribe(e=>{
        let today = new Date();
        let date =today.getFullYear()+'-'+(`0${today.getMonth()+1}`)+'-'+today.getDate();
        if(nameControl1.value<date){
          this.errors['startDate']="project cannot start in past";
        }
        else{
          this.errors['startDate']=""
        }
      })
      
    }
  

  handleBlur(control) {
    control.setValue(control.value);
  }
  handleFormSubmit(event) {
    if (this.projectForm.valid) {
      const formModel = this.projectForm.value;
      console.log(formModel);
      this.projectService.addProject(formModel);
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
