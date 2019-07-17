import { Component, OnInit } from '@angular/core';
import { OrderedServiceService } from '../ordered-service.service';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.scss']
})
export class ProjectManagerComponent implements OnInit {

  constructor(private service: OrderedServiceService) { }
  orderedServices = [];
  type = 'Project Manager';

  ngOnInit() {
    this.orderedServices = this.service.getOrderedServices();
    this.service.getStream().subscribe(e => this.orderedServices.concat(e));
  }

}
