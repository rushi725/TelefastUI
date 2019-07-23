import { Injectable, OnInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Task } from './task.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})


export class TaskNode {
  children: BehaviorSubject<TaskNode[]>;
  constructor(public task: any, children?: TaskNode[], public parent?: TaskNode) {
    this.children = new BehaviorSubject(children === undefined ? [] : children);
  }
}

export class StaticWorkflowService {

  constructor(private http: HttpClient) { }

  workFlowStream: Subject<any> = new Subject();

  workFlow: Array<any> = [];

  taskWorkflow = [];

  getWorkFlowStream() {
    return this.workFlowStream;
  }

  getWorkFlow(serviceId) {
    this.initTaskWorkflow(serviceId);
    //this.createWorkflow();
    return this.taskWorkflow;
  }

  publishStream() {
    this.workFlowStream.next(this.taskWorkflow);
  }

  initTaskWorkflow(serviceId) {
    const api = `http://localhost:8081/sfs/serviceWorkFlow/${serviceId}`;
    this.http.get(api).subscribe((e: any) => {
      this.workFlow = e;
      this.createWorkflow();
    });
  }
  createWorkflow() {
    this.taskWorkflow = [];
    const queue: Array<TaskNode> = [];
    const currentTasks: Array<any> = this.workFlow.filter(e => !e.prevTask);
    currentTasks.forEach(e => {
      const taskNode = new TaskNode(e);
      queue.push(taskNode);
      this.taskWorkflow.push(taskNode);
    });
    while (queue.length !== 0) {
      const node: TaskNode = queue.shift();
      const childs: Array<any> = this.workFlow.filter(e => e.prevTask === node.task.task.id);
      if (childs) {
        childs.forEach(e => {
          const taskNode = new TaskNode(e, []);
          queue.push(taskNode);
          const childs: Array<TaskNode> = node.children.getValue();
          childs.push(taskNode);
          // node.children.next(childs)
        });
      }
    }
    this.taskWorkflow.push(new TaskNode({ name: 'Workflow', task: new Task(0, 'Workflow', 'Desc 1', 10, true) }));
    this.publishStream();
  }

}
