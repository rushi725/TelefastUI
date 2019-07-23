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

  teamManagerId=116;
  orderedTasks:Array<any> = [];
  isClicked=false;
  orderedTask;

  ngOnInit() {
    this.orderedTaskservice.getOrderedTasksByTeamManager(this.teamManagerId)
    .subscribe((response:any)=>{
      this.orderedTasks = response;
      console.log(this.orderedTasks)

    })

    this.orderedTaskservice.getOrderedTaskStream()
    .subscribe((response:any)=>{
      this.orderedTasks =response;
      
    console.log("init()----->")
    console.log(this.orderedTasks)
    })


  }

  cancelTask(orderedTask){
    this.orderedTaskservice.cancelOrderedTask(orderedTask.orderTaskId,this.teamManagerId);
  }

  transferTask(orderedTask) {
    this.orderedTask = orderedTask;
    this.isClicked = true;
  }

  approveTask(orderedTask){
    this.orderedTaskservice.approveTask(orderedTask,this.teamManagerId);
  }

  rejectTask(orderedTask){
    this.orderedTaskservice.rejectTask(orderedTask,this.teamManagerId);
  }




}
