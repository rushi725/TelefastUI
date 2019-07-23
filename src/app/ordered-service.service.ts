import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderedServiceService {
  orderedServicesForServiceManagerStream: Subject<any> = new Subject();
  orderedServicesForProjectManagerStream: Subject<any> = new Subject();
  orderedServicesForServiceManager: any = [];

  orderedServicesForProjectManager: any = [];


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


  loadOrderedServices(role, ManagerId) {
    if (role === 'SERVICE MANAGER') {
      const apiUrl = `http://localhost:8081/sfs/orderedServices/serviceManager/${ManagerId}`;
      this._http.get(apiUrl)
    .subscribe((response: any) => {
      this.orderedServicesForServiceManager = response;
      this.publishStreamForServiceManager();
    });
    } else {
      const apiUrl = `http://localhost:8081/sfs/orderedServices/projectManager/${ManagerId}`;
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
