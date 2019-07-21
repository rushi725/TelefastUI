import { Component, OnInit } from '@angular/core';
import { OrderedServiceService } from '../ordered-service.service';

@Component({
  selector: 'app-service-manager',
  templateUrl: './service-manager.component.html',
  styleUrls: ['./service-manager.component.scss']
})
export class ServiceManagerComponent implements OnInit {

  serviceManagerId = 19;

  constructor(private orderedService: OrderedServiceService) { }
  orderedServices = [];
  type = 'SERVICE MANAGER';


  ngOnInit() {
    this.orderedService.loadOrderedServices(this.type, this.serviceManagerId);

    this.orderedService.getOrderedServiceStream(this.type)
    .subscribe((response: any) => {
      this.orderedServices = response;
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngDoCheck() {
    this.orderedServices = this.orderedService.getOrderedServices(this.type);
  }
}
