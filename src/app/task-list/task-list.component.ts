import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  constructor(private taskService: TaskService, private modalService: NgbModal) { }
  isCollapsed = false;
  tasks = [];

  closeResult: string;

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
    this.taskService.getTaskStream().subscribe(e => {
      this.tasks.concat(e);
    })
  }
  open(content) {
    console.log('Modal open');
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
