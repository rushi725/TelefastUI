import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { TeamService } from '../team.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  reviewForm: FormGroup
  formData=''
  roleOptions: Array<any> = [
    { value: 'ROLE_PRODUCT _MANAGER', viewValue: 'Product Manager' },
    { value: 'ROLE_PROJECT_MANAGER', viewValue: 'Project Manager' },
    { value: 'ROLE_SERVICE_MANAGER', viewValue: 'Service Manager' },
    { value: 'ROLE_TEAM_MANAGER', viewValue: 'Team Manager' },
    { value: 'ROLE_TEAM_MEMBER', viewValue: 'Team Member' },

  ];
  teamOptions: Array<any> = [];
  constructor(private fb: FormBuilder,
              private empService: EmployeeService,
              private teamService: TeamService,
              private router:Router) { }
  errors = {};
  ngOnInit() {
    this.teamService.getTeamStream()
    .subscribe((e: any) => this.teamOptions = e);
    this.reviewForm = this.fb.group({
      firstName: ["",[Validators.required]],
      lastName: ["",[Validators.required]],
      team:["",[Validators.required]],
      empRole: ["",[Validators.required]],
      empAddress: [""],
      contactNumber: ["",[Validators.minLength(10)]],
      email: ["",[Validators.email,Validators.required]],
      password: [`${this.getPassword()}`]
    })
   
  }
  handleFormSubmit() {
    if (this.reviewForm.valid) {
      this.formData = this.reviewForm.value;
      this.empService.postEmployeeUser(this.formData);
      this.ngOnInit()
    }
    else{      
      if(this.reviewForm.value.contactNumber.length<10){
        this.errors['cont']="min 10 digits"
      }
    }
  }
  handleCancel(){
    this.ngOnInit()
  }

  getPassword(){
  let chars = "0123456789!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  let string_length = 8;
  let randomstring = '';
  for (var i=0; i<string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum,rnum+1);
  }
  return randomstring;
}

}