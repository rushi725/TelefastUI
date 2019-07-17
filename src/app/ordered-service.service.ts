import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderedServiceService {

  constructor() { }

  orderedServices = [
    {
      id : 1,
      serviceName : 'Service 1',
      projectName : 'Project 2',
      serviceManager : 'Manager 1',
      installationAddress : 'Address 1',
      status : 'InProgress',
      progress : 70,
      date : '04/03/2018'
    },
    {
      id : 2,
      serviceName : 'Service 2',
      projectName : 'Project 3',
      serviceManager : 'Manager 2',
      installationAddress : 'Address 1',
      status : 'Completed',
      progress : 100,
      date : '04/03/2018'
    },
    {
      id : 3,
      serviceName : 'Service 3',
      projectName : 'Project 1',
      serviceManager : 'Manager 2',
      installationAddress : 'Address 1',
      status : 'Pending',
      progress : 60,
      date : '04/03/2018'
    },
    {
      id : 4,
      serviceName : 'Service 5',
      projectName : 'Project 1',
      serviceManager : 'Manager 1',
      installationAddress : 'Address 1',
      status : 'Not Started',
      progress : 0,
      date : '04/03/2018'
    },
    {
      id : 5,
      serviceName : 'Service 1',
      projectName : 'Project 2',
      serviceManager : 'Manager 1',
      installationAddress : 'Address 1',
      status : 'InProgress',
      progress : 90,
      date : '04/03/2018'
    }
  ];

  stream: Subject<any> = new Subject();

  getStream() {
    this.publishStream();
    return this.stream;
  }

  getOrderedServices() {
    return this.orderedServices;
  }



  addOrderedServices(service) {
      this.orderedServices.push(service);
      this.publishStream();
  }

  publishStream() {
    this.stream.next(e => {orderedServices: this.orderedServices; });
  }
}
