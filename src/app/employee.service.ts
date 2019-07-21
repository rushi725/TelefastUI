import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http:HttpClient) { }

  getAvailableEmployees(teamId){
    let apiUrl = `http://localhost:8081/sfs/employees/${teamId}/employees`;
    return this._http.get(apiUrl);
  }
}
