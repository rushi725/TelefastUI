import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TaskService } from '../task.service';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  
  myControl = new FormControl();

  cid = this.myControl.value;
  isSubmitted = false;
  taskForm: FormGroup;
  customerOptions: Array<any> = [];

  errors = {};

  constructor(private fb: FormBuilder,
    private taskService: TaskService,
    private customeService:CustomerService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

     this.activatedRoute.queryParamMap.subscribe((paramMap:ParamMap)=>{
      const refresh = paramMap.get('refresh');
      if(refresh) {
        this.customerOptions = this.customeService.getCustomerList();
      }
    })
    this.customeService.getCustomers();

    this.customeService.getCustomerStream()
    .subscribe((e:any)=>{
      this.customerOptions=e;
    })

    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      // desc: '',
      id:'',
      startDate:'',
      deliveryDate:''
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


  setId(customer) {
    this.taskForm.get("id").patchValue(customer.firstName);
   }

  handleBlur(control) {
    control.setValue(control.value);
  }
  handleFormSubmit(event) {
    if (this.taskForm.valid) {
      const formModel = this.taskForm.value;
      this.taskService.addTask(formModel);
      this.isSubmitted = true;
    } else {
      console.log('invalid form..');
    }
  }

}
