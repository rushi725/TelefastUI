import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { TeamService } from '../team.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  reviewForm: FormGroup
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
              private teamService: TeamService) { }

  ngOnInit() {

    this.teamService.getTeamStream()
    .subscribe((e: any) => this.teamOptions = e);
    this.reviewForm = this.fb.group({
      firstName: [""],
      lastName: [""],
      team:[""],
      empRole: [""],
      empAddress: [""],
      contactNumber: [""],
      email: ['user@email.com',Validators.email],
      password: ['']
    })
  }
  handleFormSubmit() {
    if (this.reviewForm.valid) {
      let formData = this.reviewForm.value;
      this.empService.postEmployeeUser(formData);
    }
  }
}