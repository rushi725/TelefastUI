import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss']
})
export class TeamInfoComponent implements OnInit {


  @Input("value") teamId;
  employeeInfo:Array<any>=[];


  constructor(private employeeService:EmployeeService) { }

  ngOnInit() {

    this.employeeService.getAllEmployees(this.teamId)
    .subscribe((response:any)=>{
      this.employeeInfo = response;
    })



  }

}
