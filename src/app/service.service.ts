import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  services = [
    {
      id: 1,
      name: 'Service 1',
      desc: 'desc 1'
    },
    {
      id: 1,
      name: 'Service 1',
      desc: 'desc 1'
    },
    {
      id: 1,
      name: 'Service 1',
      desc: 'desc 1'
    },
    {
      id: 1,
      name: 'Service 1',
      desc: 'desc 1'
    },
    {
      id: 1,
      name: 'Service 1',
      desc: 'desc 1'
    },
  ];
  constructor() { }
  serviceStream: Subject<any> = new Subject();
  getServicesStream() {
    return this.serviceStream;
  }

  getServices() {
    return this.services;
  }


  addService(service) {
    this.services.push(service);
    this.publishStream();
  }

  publishStream() {
    this.serviceStream.next({services: this.services});
    console.log(this.services);
  }
}
