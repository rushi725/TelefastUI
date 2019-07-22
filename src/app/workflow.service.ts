import { Injectable, OnInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Task } from './task.model';
import { Employee } from './employee.model';
import { Team } from './team.model';
import { toUnicode } from 'punycode';
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

export class WorkflowService {

  constructor(private http: HttpClient) { }

  workFlowStream: Subject<any> = new Subject();

  workFlow: Array<any> = [];
  orderedTasks: Array<any> = [];

  taskWorkflow = [];

  getWorkFlowStream() {
    return this.workFlowStream;
  }

  getWorkFlow(serviceId, orderedServiceId) {
    this.initTaskWorkflow(serviceId, orderedServiceId);
    //this.createWorkflow();
    return this.taskWorkflow;
  }

  addWorkFlow(workflow) {
    const api = 'http://localhost:8081/sfs/serviceWorkFlow';
    this.http.post(api, workflow).subscribe(e => console.log(e));
  }

  publishStream() {
    this.workFlowStream.next(this.taskWorkflow);
  }

  initTaskWorkflow(serviceId, orderedServiceId) {
    const api = `http://localhost:8081/sfs/serviceWorkFlow/${serviceId}`;
    this.http.get(api).subscribe((e: any) => {
      this.workFlow = e;
      const api2 = `http://localhost:8081/sfs/orderedTask/${orderedServiceId}`;
      this.http.get(api2).subscribe((e: any) => {
        this.orderedTasks = e;
        this.createWorkflow();
      });
    });
  }
  createWorkflow() {
      this.taskWorkflow = [];
      const queue: Array<TaskNode> = [];
      const currentTasks: Array<any> = this.orderedTasks.filter(t => t.task.id === this.workFlow.find(e => !e.nextTasks).task.id);
      currentTasks.forEach(e => {
        const taskNode = new TaskNode(e);
        queue.push(taskNode);
        this.taskWorkflow.push(taskNode);
      });
      while (queue.length !== 0) {
          const node: TaskNode = queue.shift();
          const childs: Array<any> = this.workFlow.filter(e => e.nextTasks === node.task.task.id);
          if (childs) {
            const childrenTasks: Array<any> = this.orderedTasks.filter(t => childs.find(e => e.task.id === t.task.id));
            childrenTasks.forEach(e => {
              const taskNode = new TaskNode(e, []);
              queue.push(taskNode);
              const childs: Array<TaskNode> = node.children.getValue();
              childs.push(taskNode);
              // node.children.next(childs)
          });
        }
      }
      this.taskWorkflow.push(new TaskNode({name: 'Workflow', task: new Task(0, 'Workflow', 'Desc 1', 10, true), taskStatus: 'Completed'}));
      this.publishStream();
  }

}
