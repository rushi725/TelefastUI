import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  customerStream:Subject<any> = new Subject();
  customerList:any=[]

  constructor(private _http:HttpClient) { }

  getCustomerList(){
    return this.customerList;
  }

  getCustomerStream(){
    return this.customerStream;
  }

  loadCustomers(){
    let apiUrl="http://localhost:8081/sfs/customer";
    this._http.get(apiUrl)
    .subscribe(e=>{
      this.customerList=e;
      this.publishStream();
    })

  }

  addCustomer(customer){
    let apiUrl="http://localhost:8081/sfs/customer";
    this._http.post(apiUrl,customer)
    .subscribe(e=>{
      this.loadCustomers();
    })
  }

  publishStream(){
    this.customerStream.next({customerList: this.customerList});
  }
}
