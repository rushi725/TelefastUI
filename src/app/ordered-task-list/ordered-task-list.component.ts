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

  teamManagerId=14;
  orderedTasks:Array<any> = [];
  isClicked=false;
  orderedTask;

  ngOnInit() {
    this.orderedTaskservice.getOrderedTasksByTeamManager(this.teamManagerId);


    this.orderedTaskservice.getOrderedTaskStream()
    .subscribe((response:any)=>{
      this.orderedTasks =response;
    })

  }

  ngDoCheck(){

    this.orderedTasks=this.orderedTaskservice.getOrderedTaskList();

  }

  cancelTask(orderedTask){
    this.orderedTaskservice.cancelOrderedTask(orderedTask.orderTaskId,this.teamManagerId);
  }

  transferTask(orderedTask) {
    this.orderedTask = orderedTask;
    this.isClicked = true;
  }




}
