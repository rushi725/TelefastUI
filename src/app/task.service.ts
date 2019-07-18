import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient) { }

  tasks: Array<any> = [];
  getTaskStream() {
    const api = 'http://localhost:8082/sfs/tasks';
    return this.http.get(api);

  }

  getTasks() {
    const api = 'http://localhost:8082/sfs/tasks';
    this.http.get(api).subscribe((e: any) => this.tasks = e);
    console.log(this.tasks);
    return this.tasks;
  }


  addTask(task) {
    const api = 'http://localhost:8082/sfs/tasks';
    this.http.post(api, task).subscribe();
  }
}
