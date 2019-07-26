import { Component, OnInit } from '@angular/core';
import { OrderedServiceService } from '../ordered-service.service';
import { ServiceService } from '../service.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from '../project.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.scss']
})
export class ProjectManagerComponent implements OnInit {

  constructor(private orderedService: OrderedServiceService,
              private orderService: OrderedServiceService,
              private projectService: ProjectService,
              private userService: UserService) { }

  serviceExists = true;
  orderedServices: any = [];
  type = 'PROJECT MANAGER';
  employee = this.userService.getEmployee();
  projectManagerId = this.employee.id;
  projects = null;

  ngOnInit() {
    this.projectService.getProjectByManager(this.projectManagerId)
      .subscribe((e: any) => this.projects = e
      );

    // this.orderedService.loadOrderedServices(this.type, this.projectManagerId);

    // this.orderedService.getOrderedServiceStream(this.type).subscribe((e: any) => this.orderedServices = e);
    this.projectService.getProjectStream().subscribe((e: any) => this.projects = e);
  }

  // ngDoCheck() {
  //   this.orderedServices = this.orderedService.getOrderedServices(this.type);
  // }
}
