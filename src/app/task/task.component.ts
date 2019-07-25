import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';
import { OrderedTaskService } from '../ordered-task.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input("value") task;
  @Input("type") type;
  teamManagerId = 12;

  isClicked = false;
  orderedTask;

  hidden=true;

  toggle(){
    this.hidden = !this.hidden;
  }

  constructor(private taskService: TaskService,
              private orderedTaskservice:OrderedTaskService,
              private modalService: NgbModal) { }

  ngOnInit() {

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

  deleteTask(task){
    console.log(task)
    this.taskService.deleteTask(task);
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
