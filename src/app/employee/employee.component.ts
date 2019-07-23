import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  reviewForm: FormGroup
  constructor(private fb: FormBuilder,private empService:EmployeeService) { }

  ngOnInit() {
    this.reviewForm = this.fb.group({
      firstName: [""],
      lastName: [""],
      teamId:[""],
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
      this.empService.postEmployeeUser(formData)
    }
  }
}