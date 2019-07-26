import { Component, OnInit } from '@angular/core';
import { OrderedTaskService } from '../ordered-task.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { StatusService } from '../status.service';
import { UserService } from '../user.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-ordered-task-list',
  templateUrl: './ordered-task-list.component.html',
  styleUrls: ['./ordered-task-list.component.scss']
})
export class OrderedTaskListComponent implements OnInit {

  constructor(private orderedTaskservice: OrderedTaskService,
    private modalService: NgbModal,
    private statusService: StatusService,
    private userService: UserService) { }

  employee = this.userService.getEmployee();
  teamManagerId = this.employee.id;
  teamId = this.employee.team.id;

  type = "ORDEREDTASK";
  orderedTasks: Array<any> = [];

  filteredTasks: Array<any> = [];

  isClicked = false;
  orderedTask;
  Status: Array<any> = [];


  ngOnInit() {
    console.log(this.employee);

    this.orderedTaskservice.getOrderedTasksByTeamManager(this.teamManagerId)
      .subscribe((response: any) => {
        this.orderedTasks = response;
        this.filteredTasks = this.orderedTasks;
      });

    this.statusService.getStatus()
      .subscribe((response: any) => {
        this.Status = response;
        console.log(this.Status)
      });

    this.orderedTaskservice.getOrderedTaskStream()
      .subscribe((response: any) => {
        this.orderedTasks = response;
        this.filteredTasks = this.orderedTasks;
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

  filterBy(index) {
    // console.log(index);
    // console.log(this.Status[index])
    if (index === 7) {
      this.filteredTasks = this.orderedTasks;
    } else {

      this.filteredTasks = this.orderedTasks.filter(e =>
        e.taskStatus === this.Status[index]
      )
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
