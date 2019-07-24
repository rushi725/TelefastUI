import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderedTaskService {

  orderedTasks: any = [];
  taskInfo: Array<any> = [];

  constructor(private _http: HttpClient) { }
  orderedTasksStream: Subject<any> = new Subject();
  taskInfoStream: Subject<any> = new Subject();

  getOrderedTaskStream() {
    return this.orderedTasksStream;
  }

  getTaskInfoStream() {
    return this.taskInfoStream;
  }

  getOrderedTaskList() {
    return this.orderedTasks;
  }

  getOrderedTaskInfo() {
    return this.taskInfo;
  }

  getOrderedTasksByTeamManager(id) {
    let apiUrl = `http://localhost:8081/sfs/orderedTask/teamManager/${id}`;
    return this._http.get(apiUrl)
  }

  getOrderedTaskInfoByEmployeeId(id) {
    let apiUrl = `http://localhost:8081/sfs/orderedTask/employee/${id}`;
     return this._http.get(apiUrl)
  }

  changeTaskStatus(orderedTask, statusId) {
    let send = {
      statusId
    }
    let orderedTaskId = orderedTask.orderTaskId;
    let employeeId = orderedTask.employee.id;
    console.log(orderedTaskId);
    console.log(statusId)

    let apiUrl = `http://localhost:8081/sfs/orderedTask/${orderedTaskId}/changeStatus/${statusId}`;
    this._http.put(apiUrl, send)
      .subscribe(e => {
        if (e) {
          // start Next Task---->
          console.log("orderedtaskId--->")
          console.log(orderedTaskId)
          let apiUrl2 = `http://localhost:8081/sfs/startService/startNext/${orderedTaskId}`;
          this._http.put(apiUrl2, orderedTaskId)
            .subscribe(e => {
              console.log("inside starting next task--->")
              console.log(e)
            })
        }
        this.getOrderedTaskInfoByEmployeeId(employeeId)
        .subscribe((response:any)=>{
          this.taskInfoStream.next(response);
        })
      })
  }

  cancelOrderedTask(orderedTaskId, teamManagerId) {
    let reason = "task cancelled BFO";
    let apiUrl = `http://localhost:8081/sfs/orderedTask/${orderedTaskId}/cancel`;
    this._http.put(apiUrl, reason)
      // .subscribe(e => {
      //   this.getOrderedTasksByTeamManager(teamManagerId);
      // })
  }

  transferTaskToEmployeeId(orderedTaskId, employeeId, teamManagerId) {
    let send = {
      orderedTaskId,
      employeeId
    }

    let apiUrl = `http://localhost:8081/sfs/assignTask/${orderedTaskId}/${employeeId}`;
    this._http.put(apiUrl, send)
      .subscribe(e => {
        this.getOrderedTasksByTeamManager(teamManagerId)
        .subscribe((response:any)=>{
          this.orderedTasksStream.next(response);
        })
      })

  }

  approveTask(orderedTask, teamManagerId) {
    let send;
    let orderedTaskId = orderedTask.orderTaskId;
    let employeeId = orderedTask.employee.id;
    let apiUrl = `http://localhost:8081/sfs/orderedTask/${orderedTaskId}/complete`;
    this._http.put(apiUrl, send)
    .subscribe(e => {
      if (e) {
        // start Next Task---->
        console.log("orderedtaskId--->")
        console.log(orderedTaskId)
        let apiUrl2 = `http://localhost:8081/sfs/startService/startNext/${orderedTaskId}`;
        this._http.put(apiUrl2, orderedTaskId)
          .subscribe(e => {
            console.log("inside starting next task--->")
            console.log(e)
          })
      }
      this.getOrderedTaskInfoByEmployeeId(employeeId)
      .subscribe((response:any)=>{
        this.taskInfoStream.next(response);
      })
      this.getOrderedTasksByTeamManager(teamManagerId)
      .subscribe((response:any)=>{
        this.orderedTasksStream.next(response);
      })
    })
  }

  rejectTask(orderedTask, teamManagerId) {
    let send;
    let orderedTaskId = orderedTask.orderTaskId;
    let apiUrl = `http://localhost:8081/sfs/orderedTask/${orderedTaskId}/reject`;
    this._http.put(apiUrl, send)
      .subscribe(e => {
        this.getOrderedTasksByTeamManager(teamManagerId)
      .subscribe((response:any)=>{
        this.orderedTasksStream.next(response);
      })
      })
  }

  publishStream() {
    this.orderedTasksStream.next({ orderedTasks: this.orderedTasks });
  }
  publishStreamForTaskInfo() {
    // console.log(this.taskInfo)
    this.taskInfoStream.next({ taskInfo: this.taskInfo })
  }
}
