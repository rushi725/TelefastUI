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
    this.service.getOrderedService().subscribe((e: any) => this.orderedServices = e);
    this.service.getorderServiceStream().subscribe(e => this.orderedServices = e.orderedServices);
  }
}
