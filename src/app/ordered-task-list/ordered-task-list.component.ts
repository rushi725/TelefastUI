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

  teamManagerId = 115;
  orderedTasks: Array<any> = [];
  isClicked = false;
  orderedTask;

  ngOnInit() {
    this.orderedTaskservice.getOrderedTasksByTeamManager(this.teamManagerId)
    .subscribe((response: any) => {
      this.orderedTasks = response;
    });

    this.orderedTaskservice.getOrderedTaskStream()
    .subscribe((response: any) => {
      this.orderedTasks = response;
    });

  }

  closeResult: string;

  open(content, orderedTask) {
    this.orderedTask = orderedTask;
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

  cancelTask(orderedTask) {
    this.orderedTaskservice.cancelOrderedTask(orderedTask.orderTaskId, this.teamManagerId);
  }

  transferTask(orderedTask) {
    this.orderedTask = orderedTask;
    this.isClicked = true;
  }

  approveTask(orderedTask) {
    this.orderedTaskservice.approveTask(orderedTask, this.teamManagerId);
  }

  rejectTask(orderedTask) {
    this.orderedTaskservice.rejectTask(orderedTask, this.teamManagerId)
  }




}
