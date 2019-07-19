import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss']
})
export class TaskStatusComponent implements OnInit {

  constructor(private http: HttpClient) { }
  empId = 19;
  employee;
  ngOnInit() {
    const api = 'http://localhost:8081/sfs/employees/empId';
    this.http.get(api).subscribe((e: any) => this.employee = e);
    console.log(this.employee);
  }

}
