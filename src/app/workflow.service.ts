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

export class WorkflowService implements OnInit {

  constructor(private http: HttpClient) { }

  workFlowStream: Subject<any> = new Subject();

  ngOnInit() {
    // const api = 'http://localhost:8081/sfs/serviceWorkFlow';
    // this.http.get(api).subscribe((e: any) => this.workFlow = e);

    // const api2 = 'http://localhost:8081/sfs/orderedTask';
    // this.http.get(api2).subscribe((e: any) => this.orderedTasks = e);
  }

  // orderedTasks = [];
  // tslint:disable-next-line: member-ordering
  workFlow = [
    {
      id : 1,
      task : new Task(1, 'Task 1', 'Desc 1', 10, true),
      team : new Team(100, 'Team 1', 'Desc 1'),
      seqNo : 1,
      prev : null
    },
    {
      id : 2,
      task : new Task(2, 'Task 2', 'Desc 2', 10, true),
      team : new Team(102, 'Team 2', 'Desc 2'),
      seqNo : 2,
      prev : 1
    }
    ,
    {
      id : 3,
      task : new Task(3, 'Task 3', 'Desc 2', 10, true),
      team : new Team(103, 'Team 3', 'Desc 2'),
      seqNo : 3,
      prev : 1
    },
    {
      id : 4,
      task : new Task(4, 'Task 4', 'Desc 3', 10, true),
      team : new Team(104, 'Team 4', 'Desc 3'),
      seqNo : 4,
      prev : 2
    },
    {
      id : 5,
      task : new Task(5, 'Task 4', 'Desc 4', 10, true),
      team : new Team(103, 'Team 4', 'Desc 4'),
      seqNo : 5,
      prev : 3
    },
  ];
  // tslint:disable-next-line: member-ordering
  orderedTasks = [
    {
        id: 1,
        task: new Task(1, 'Task 1', 'Desc 1', 10, true),
        employee : new Employee(10, new Team(100, 'Team 1', 'Desc 1'), 'Rushabh', 'Shah', 'Team_Member', 'Address 1', '9096678120', false),
        status : 'In Progress',
        date : '04/05/2018',
        approved : null,
        denialReason : null
    },
    {
      id: 2,
      task: new Task(2, 'Task 2', 'Desc 1', 10, true),
      employee : new Employee(10, new Team(100, 'Team 1', 'Desc 1'), 'Rushabh', 'Shah', 'Team_Member', 'Address 1', '9096678120', false),
      status : 'In Progress',
      date : '04/05/2018',
      approved : null,
      denialReason : null
  },
  {
    id: 3,
    task: new Task(3, 'Task 3', 'Desc 1', 10, true),
    employee : new Employee(10, new Team(100, 'Team 1', 'Desc 1'), 'Rushabh', 'Shah', 'Team_Member', 'Address 1', '9096678120', false),
    status : 'In Progress',
    date : '04/05/2018',
    approved : null,
    denialReason : null
  },
  {
    id: 4,
    task: new Task(4, 'Task 4', 'Desc 1', 10, true),
    employee : new Employee(10, new Team(100, 'Team 1', 'Desc 1'), 'Rushabh', 'Shah', 'Team_Member', 'Address 1', '9096678120', false),
    status : 'In Progress',
    date : '04/05/2018',
    approved : null,
    denialReason : null
  },
  {
    id: 5,
    task: new Task(5, 'Task 5', 'Desc 1', 10, true),
    employee : new Employee(10, new Team(100, 'Team 1', 'Desc 1'), 'Rushabh', 'Shah', 'Team_Member', 'Address 1', '9096678120', false),
    status : 'In Progress',
    date : '04/05/2018',
    approved : null,
    denialReason : null
  }
  ];

  taskWorkflow = [];


  getWorkFlowStream() {
    this.publishStream();
    return this.workFlowStream;
  }

  getWorkFlow() {
    this.createWorkflow();
    return this.taskWorkflow;
  }

  addWorkFlow(workflow) {
    const api = 'http://localhost:8081/sfs/serviceWorkFlow';
    this.http.post(api, workflow).subscribe(e => console.log(e));
  }

  publishStream() {
    this.workFlowStream.next(e => {taskWorkFlow : this.taskWorkflow;});
  }
  createWorkflow() {
      this.taskWorkflow = [];
      const queue: Array<TaskNode> = [];
      const currentTasks: Array<any> = this.orderedTasks.filter(t => t.task.id === this.workFlow.find(e => e.prev === null).task.id);
      console.log(currentTasks);
      currentTasks.forEach(e => {
        const taskNode = new TaskNode(e);
        queue.push(taskNode);
        this.taskWorkflow.push(taskNode);
      });
      while (queue.length !== 0) {
          const node: TaskNode = queue.shift();
          const childs: Array<any> =  this.workFlow.filter(e => e.prev === node.task.id);
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
      this.taskWorkflow.push(new TaskNode({name: 'Workflow', task: new Task(0, 'Workflow', 'Desc 1', 10, true), }));
  }

}
