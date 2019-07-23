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

  constructor(private orderedService: OrderedServiceService,
              private orderService: OrderedServiceService,
              private projectService: ProjectService) { }

  serviceExists = true;
  orderedServices: any = [];
  type = 'PROJECT MANAGER';
  projectManagerId = 9;
  project = null;

  ngOnInit() {
    this.projectService.getProjectByManager(this.projectManagerId)
      .subscribe((e: any) => this.project = e
      );

    this.orderedService.loadOrderedServices(this.type, this.projectManagerId);

    this.orderedService.getOrderedServiceStream(this.type).subscribe((e: any) => this.orderedServices = e);

    this.projectService.getProjectStream().subscribe((e: any) => this.project = e.project);
  }

  // ngDoCheck() {
  //   this.orderedServices = this.orderedService.getOrderedServices(this.type);
  // }
}
