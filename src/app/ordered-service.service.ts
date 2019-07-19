import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderedServiceService {
  orderServiceStream: Subject<any> = new Subject();
  orderedServices:any=[];

  constructor(private _http:HttpClient) { }

  getorderServiceStream() {
    this.publishStream();
    return this.orderServiceStream;
  }

  getOrderedServiceList() {
    return this.orderedServices;
  }

  getOrderedService(){
    let apiUrl="http://localhost:8081/sfs/orderedServices";
    this._http.get(apiUrl)
    .subscribe(e=>{
      this.orderedServices = e;
    })
    this.publishStream();
  }



  addOrderedServices(service) {
    let apiUrl="http://localhost:8081/sfs/orderedServices";
    this._http.post(apiUrl,service)
    .subscribe(e=>{
      this.publishStream();
    })    
  }

  publishStream() {
    this.orderServiceStream.next(e => {orderedServices: this.orderedServices; });
  }
}
