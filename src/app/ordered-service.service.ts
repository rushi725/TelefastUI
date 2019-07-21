import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderedServiceService {
  orderServiceStream: Subject<any> = new Subject();
  orderedServices: any = [];

  constructor(private _http: HttpClient) { }

  getorderServiceStream() {
    return this.orderServiceStream;
  }

  // getOrderedServiceList() {
  //   return this.orderedServices;
  // }

  // getOrderedService() {
  //   const apiUrl = 'http://localhost:8081/sfs/orderedServices';
  //   this._http.get(apiUrl)
  //   .subscribe(e => {
  //     this.orderedServices = e;
  //   });
  //   this.publishStream();
  // }



  addOrderedServices(service) {
    const apiUrl = 'http://localhost:8081/sfs/orderedServices';
    this._http.post(apiUrl, service)
    .subscribe(e => {
      this.orderedServices.push(e);
      this.orderServiceStream.next({orderedServices: this.orderedServices});
    });
  }

  // publishStream() {
  //   this.orderServiceStream.next(e => {orderedServices: this.orderedServices; });
  // }

  getOrderedService() {
    const apiUrl = 'http://localhost:8081/sfs/orderedServices';
    this._http.get(apiUrl).subscribe((e: any) => this.orderedServices = e);
    return this._http.get(apiUrl);
  }
}
