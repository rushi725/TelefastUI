import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderedServiceService {
  orderedServicesForServiceManagerStream: Subject<any> = new Subject();
  orderedServicesForProjectManagerStream: Subject<any> = new Subject();
  orderedServicesForServiceManager: Array<any> = [];

  orderedServicesForProjectManager: Array<any> = [];
  managerId;

  constructor(private _http: HttpClient) { }

  getOrderedServices(role) {
    if (role === 'SERVICE MANAGER') {
      return this.orderedServicesForServiceManager;
    } else {
      return this.orderedServicesForProjectManager;
    }
  }

  getOrderedServiceStream(role) {
    if (role === 'SERVICE MANAGER') {
      return this.orderedServicesForServiceManagerStream;
    } else {
      return this.orderedServicesForProjectManagerStream;
    }
  }

  startService(orderedServiceId) {
    const apiUrl = `http://localhost:8081/sfs/startService/${orderedServiceId}`;
    this._http.put(apiUrl, 'start')
      .subscribe((e: any) => {
          this.loadOrderedServices('SERVICE MANAGER',this.managerId);
      });
  }


  loadOrderedServices(role, managerId) {
    this.managerId = managerId;
    if (role === 'SERVICE MANAGER') {
      const apiUrl = `http://localhost:8081/sfs/orderedServices/serviceManager/${managerId}`;
      this._http.get(apiUrl)
        .subscribe((response: any) => {
          this.orderedServicesForServiceManager = response;
          this.publishStreamForServiceManager();
        });
    } else {
      const apiUrl = `http://localhost:8081/sfs/orderedServices/projectManager/${managerId}`;
      this._http.get(apiUrl)
        .subscribe((response: any) => {
          this.orderedServicesForProjectManager = response;
          this.publishStreamProjectManager();
        });
    }

  }


  publishStreamForServiceManager() {
    this.orderedServicesForServiceManagerStream.next(this.orderedServicesForServiceManager);
  }

  publishStreamProjectManager() {
    this.orderedServicesForProjectManagerStream.next(this.orderedServicesForProjectManager);

  }

  addOrderedServices(service) {
    const apiUrl = 'http://localhost:8081/sfs/orderedServices';
    this._http.post(apiUrl, service)
      .subscribe(e => {
        this.orderedServicesForProjectManager.push(e);
        this.publishStreamProjectManager();
      });
  }
}
