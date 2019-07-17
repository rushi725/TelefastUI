import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderedTaskService {
  orderedTasks = [
    {
      id: 1,
      taskName : 'task1',
      teamMember : 'Member 1',
      status : 'InProgress',
      approved : false,
      date : '06/06/2019'
    },
    {
      id: 1,
      taskName : 'task2',
      teamMember : 'Member 2',
      status : 'Pending',
      approved : false,
      date : '06/06/2019'
    },
    {
      id: 1,
      taskName : 'task3',
      teamMember : 'Member 3',
      status : 'NotStarted',
      approved : false,
      date : '06/06/2019'
    },
    {
      id: 1,
      taskName : 'task4',
      teamMember : 'Member 4',
      status : 'Cancelled',
      approved : false,
      date : '06/06/2019'
    },
    {
      id: 1,
      taskName : 'task5',
      teamMember : 'Member 5',
      status : 'Completed',
      approved : false,
      date : '06/06/2019'
    }
  ];
  constructor() { }
  orderedTasksStream: Subject<any> = new Subject();

  getStream() {
    return this.orderedTasksStream;
  }

  getOrderedTasks() {
    return this.orderedTasks;
  }

  publishStream() {
    this.orderedTasksStream.next({orderedTasks: this.orderedTasks});
  }
}
