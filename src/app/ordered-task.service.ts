import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderedTaskService {
  
  orderedTasks:any=[];
  taskInfo:any={};

  constructor(private _http:HttpClient) { }
  orderedTasksStream: Subject<any> = new Subject();
  taskInfoStream: Subject<any> = new Subject();


  getOrderedTaskStream() {
    return this.orderedTasksStream;
  }

  getTaskInfoStream(){
    return this.taskInfoStream;
  }

  getOrderedTaskList(){
    return this.orderedTasks;
  }

  getOrderedTaskInfo(){
    return this.taskInfo;
  }

  getOrderedTasksByTeamManager(id) {
    let apiUrl=`http://localhost:8081/sfs/orderedTask/teamManager/${id}`;
    this._http.get(apiUrl)
    .subscribe(e=>{
      this.orderedTasks=e;
      this.publishStream();
    })
  }

  getOrderedTaskInfoByEmployeeId(id){
    let apiUrl=`http://localhost:8081/sfs/orderedTask/employee/${id}`;
    this._http.get(apiUrl)
    .subscribe(e=>{
      this.taskInfo = e;
      this.publishStreamForTaskInfo();
    })
  }

  changeTaskStatus(employeeId,orderedTaskId,statusId){
    let send={
      orderedTaskId,
      statusId
    }
    console.log(orderedTaskId);
    console.log(statusId)
    let apiUrl=`http://localhost:8081/sfs/orderedTask/${orderedTaskId}/changeStatus/${statusId}`;
     this._http.put(apiUrl,send)
     .subscribe(e=>{
      this.getOrderedTaskInfoByEmployeeId(employeeId)
    })
  }

  cancelOrderedTask(orderedTaskId,teamManagerId){
    let reason="task cancelled BFO";
    let apiUrl=`http://localhost:8081/sfs/orderedTask/${orderedTaskId}/cancel`;
    this._http.put(apiUrl,reason)
    .subscribe(e=>{
      this.getOrderedTasksByTeamManager(teamManagerId);
    })
  }

  transferTaskToEmployeeId(orderedTaskId,employeeId,teamManagerId){
    let send={
      orderedTaskId,
      employeeId
    }

    let apiUrl=`http://localhost:8081/sfs/assignTask/${orderedTaskId}/${employeeId}`;
    this._http.put(apiUrl,send)
    .subscribe(e=>{
      this.getOrderedTasksByTeamManager(teamManagerId);
    })

  }

  publishStream() {
    this.orderedTasksStream.next({orderedTasks: this.orderedTasks});
  }
  publishStreamForTaskInfo(){
    // console.log(this.taskInfo)
    this.taskInfoStream.next({taskInfo:this.taskInfo})
  }
}
