import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }

  getAvailableEmployees(teamId) {
    const apiUrl = `http://localhost:8081/sfs/employees/${teamId}/employees`;
    return this._http.get(apiUrl);
  }

  getEmployeeStream() {
    const api = 'http://localhost:8081/sfs/employees/serviceManager';
    return this._http.get(api);
  }
}
