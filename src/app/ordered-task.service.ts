import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderedTaskService {
  
  orderedTasks:any=[];

  constructor(private _http:HttpClient) { }
  orderedTasksStream: Subject<any> = new Subject();

  getStream() {
    return this.orderedTasksStream;
  }

  getOrderedTasksByTeamManager(id) {
    console.log("in getOrderedTask()")
    let apiUrl=`http://localhost:8081/sfs/orderedTask/teamManager/${id}`;
    return this._http.get(apiUrl);
  }

  getOrderedTaskInfoByEmployeeId(id){
    console.log("in getOrderedTaskByEmployeeId()")
    let apiUrl=`http://localhost:8081/sfs/orderedTask/employee/${id}`;
    return this._http.get(apiUrl);
  }

  publishStream() {
    this.orderedTasksStream.next({orderedTasks: this.orderedTasks});
  }
}
