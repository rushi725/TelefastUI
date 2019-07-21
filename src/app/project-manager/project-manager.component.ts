import { Component, OnInit } from '@angular/core';
import { OrderedServiceService } from '../ordered-service.service';
import { ServiceService } from '../service.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.scss']
})
export class ProjectManagerComponent implements OnInit {

  constructor(private orderService: OrderedServiceService,
              private projectService: ProjectService) { }

  serviceExists = true;
  orderedServices: any = [];
  type = 'Project Manager';
  projectManagerId = 60;
  project = null;

  closeResult: string;


  ngOnInit() {
    this.projectService.getProjectByManager(this.projectManagerId)
    .subscribe((e: any) => this.project = e
    );

    this.orderService.getOrderedService().subscribe((e: any) => this.orderedServices = e);

    this.orderService.getorderServiceStream().subscribe((e: any) => this.orderedServices = e.orderedServices);

    this.projectService.getProjectStream().subscribe((e: any) => this.project = e.project);
  }
}
