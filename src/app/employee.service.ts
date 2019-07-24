import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employee = {};
  user = {};
  constructor(private userService: UserService, private _http: HttpClient) { }
  postEmployeeUser(formData) {
    this.employee['firstName'] = formData.firstName;
    this.employee["lastName"] = formData.lastName;
    this.employee["empContactNo"] = formData.contactNumber;
    this.employee["availableStatus"] = true;
    this.user["email"] = formData.email;
    this.employee["empAddress"] = formData.empAddress;
    this.employee["empRole"] = formData.empRole;
    this.employee["team"] = formData.team;
    this.user["password"] = formData.password;
    this.user["active"] = "false";
    console.log(this.userService.getUserAuthToken());
    console.log(this.employee);

    let httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.userService.getUserAuthToken()}`
      })
    };
    let apiUrl = `http://localhost:8081/sfs/employees`;
    this._http.post(apiUrl, this.employee, httpOptions)
      .subscribe((e: any) => {
        console.log(e);
        this.user["employee"] = e;
        this.postUser(httpOptions);
      });
  }
  postUser(httpOptions) {
    let apiUrl = `http://localhost:8081/sfs/user/register`;
    this._http.post(apiUrl, this.user, httpOptions)
      .subscribe((e: any) => {
        console.log(e);
      });
  }


  getAvailableEmployees(teamId) {
    const apiUrl = `http://localhost:8081/sfs/employees/${teamId}/employees`;
    return this._http.get(apiUrl);
  }

  getEmployeeStream() {
    const api = 'http://localhost:8081/sfs/employees/serviceManager';
    return this._http.get(api);
  }
}
