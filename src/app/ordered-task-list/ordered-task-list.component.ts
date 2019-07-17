import { Component, OnInit } from '@angular/core';
import { OrderedTaskService } from '../ordered-task.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ordered-task-list',
  templateUrl: './ordered-task-list.component.html',
  styleUrls: ['./ordered-task-list.component.scss']
})
export class OrderedTaskListComponent implements OnInit {

  constructor(private orderedTaskservice: OrderedTaskService, private modalService: NgbModal ) { }

  orderedTasks = [];
  isClicked=false;

  ngOnInit() {

    this.orderedTasks = this.orderedTaskservice.getOrderedTasks();
    this.orderedTaskservice.getStream().subscribe(e =>
      this.orderedTasks.concat(e));
  }

  transferTask() {
    this.isClicked = true;
  }




}
