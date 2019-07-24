import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../project.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  constructor(private modalService: NgbModal,private projectService: ProjectService) { }

@Input("value") projects;
@Input("projectManagerId") projectManagerId;
type  = 'PROJECT MANAGER';

  ngOnInit() {
  //   this.projectService.getProjectByManager(this.projectManagerId)
  //     .subscribe((e: any) => this.projects = e
  //     );
  //   this.projectService.getProjectStream().subscribe((e: any) => this.projects = e);
  }

  closeResult: string;

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
