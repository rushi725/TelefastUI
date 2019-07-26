import { Component, OnInit } from '@angular/core';
import { OrderedServiceService } from '../ordered-service.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-service-manager',
  templateUrl: './service-manager.component.html',
  styleUrls: ['./service-manager.component.scss']
})
export class ServiceManagerComponent implements OnInit {

  constructor(private orderedService: OrderedServiceService,
              private userService: UserService) { }

  employee = this.userService.getEmployee();
  serviceManagerId = this.employee.id ;
  orderedServices: Array<any> = null;
  type = 'SERVICE MANAGER';


  ngOnInit() {
    this.orderedService.loadOrderedServices(this.type, this.serviceManagerId);

    this.orderedService.getOrderedServiceStream(this.type)
    .subscribe((response: any) => {
      this.orderedServices = response;
    });
  }
}
