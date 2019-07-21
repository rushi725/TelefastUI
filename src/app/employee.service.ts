import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  employees: Array<any> = [];
  getEmployees() {
    return this.employees;
  }

  getEmployeeStream() {
    const api = 'http://localhost:8081/sfs/employees';
    return this.http.get(api);
  }
}
