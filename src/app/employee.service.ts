import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import {HttpHeaders,HttpClient} from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employee={}
  user={}
  constructor(private userService:UserService,private _http:HttpClient) { }
  postEmployeeUser(formData){
    this.employee["firstName"]=formData.firstName
    this.employee["lastName"]=formData.lastName
    this.employee["empContactNo"]= formData.contactNumber
    this.user["email"]=formData.email
    this.employee["empAddress"]=formData.empAddress
    this.employee["empRole"]=formData.empRole
    this.user["password"]=formData.password
    this.user["active"]="false"
    console.log(this.userService.getUserAuthToken());
    console.log(this.employee);
    
    let httpOptions = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.userService.getUserAuthToken()}`
      })
    }
    let apiUrl=`http://localhost:8081/sfs/employees/${formData.teamId}`;
    let url = `http://localhost:8081/sfs/employees/id/${formData.contactNumber}`
    this._http.post(apiUrl,this.employee,httpOptions)
    .subscribe((e:any)=>{
      console.log(e);
      this._http.get(url).subscribe((e:any)=>{
        this.postUser(e,httpOptions) 
      })
    })
  }
  postUser(e,httpOptions){
    let apiUrl=`http://localhost:8081/sfs/user/register/${e}`;
    console.log(httpOptions.Authorization)
    this._http.post(apiUrl,this.user,httpOptions)
    .subscribe((e:any)=>{
      console.log(e);
    })
  }
 

  getAvailableEmployees(teamId) {
    const apiUrl = `http://localhost:8081/sfs/employees/${teamId}/employees`;
    return this._http.get(apiUrl);
  }

  getEmployeeStream() {
    const api = 'http://localhost:8081/sfs/employees';
    return this._http.get(api);
  }
}
