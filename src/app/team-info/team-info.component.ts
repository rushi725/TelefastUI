import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss']
})
export class TeamInfoComponent implements OnInit {


  // @Input("value") teamId;
  employeeInfo:Array<any>=[];
  teamId;
  employee;

  constructor(private employeeService:EmployeeService,
              private userService: UserService) { }

  ngOnInit() {
    this.employee = this.userService.employee;
    this.teamId = this.employee.team.id;
    this.employeeService.getAllEmployees(this.teamId)
    .subscribe((response:any)=>{
      this.employeeInfo = response;
    })



  }

}
