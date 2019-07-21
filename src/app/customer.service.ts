import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerStream: Subject<any> = new Subject();
  customerList: any = [];

  constructor(private _http: HttpClient) { }

  getCustomerList() {
    return this.customerList;
  }

  getCustomerStream() {
    // return this.customerStream;
    const apiUrl = 'http://localhost:8081/sfs/customer';
    return this._http.get(apiUrl);
  }

  getCustomers() {
    const apiUrl = 'http://localhost:8081/sfs/customer';
    this._http.get(apiUrl)
    .subscribe(e => {
      this.customerList = e;
    });
    this.publishStream();

  }

  addCustomer(customer) {
    this.customerList.push(customer);
    const apiUrl = 'http://localhost:8081/sfs/customer';
    this._http.post(apiUrl, customer)
    .subscribe(e => {
      this.publishStream();
    });
  }

  publishStream() {
    this.customerStream.next({customerList: this.customerList});
  }
}
