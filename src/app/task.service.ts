import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) { }

  tasks: Array<any> = [];

  taskStream: Subject<any> = new Subject();

  getTaskStream() {
    const api = 'http://localhost:8081/sfs/tasks';
    this.http.get(api).subscribe((e: any) => this.tasks = e);
    return this.http.get(api);
  }

  getTasks() {
    return this.taskStream;
  }


  addTask(task) {
    const api = 'http://localhost:8081/sfs/tasks';
    this.http.post(api, task).subscribe((e: any) => this.tasks.push(e));
    this.taskStream.next({tasks: this.tasks});
  }
}
