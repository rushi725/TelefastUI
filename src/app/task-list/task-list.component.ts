import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  constructor(private service: TaskService, private modalService: NgbModal, private activatedRoute: ActivatedRoute) { }
  tasks: Array<any> = [];
  isCollapsed = false;
  closeResult: string;

  ngOnInit() {
    // this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
    //   const refresh = paramMap.get('refresh');
    //   if (refresh) {
    //     this.service.getTaskStream().subscribe((e: any) => {
    //       this.tasks = e;
    //     });
    //   }
    // });

    this.service.getTaskStream().subscribe((e: any) => {
      this.tasks = e;
    });

    this.service.getTasks().subscribe((e: any) => this.tasks = e.tasks);

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
