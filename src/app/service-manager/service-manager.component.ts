import { Component, OnInit } from '@angular/core';
import { OrderedServiceService } from '../ordered-service.service';

@Component({
  selector: 'app-service-manager',
  templateUrl: './service-manager.component.html',
  styleUrls: ['./service-manager.component.scss']
})
export class ServiceManagerComponent implements OnInit {

  constructor(private service: OrderedServiceService) { }
  orderedServices = [];
  type = 'Service Manager';

  ngOnInit() {
    this.orderedServices = this.service.getOrderedServices();
    this.service.getStream().subscribe(e => this.orderedServices.concat(e));
  }
}
