import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  services: Array<any> = [];

  getServicesStream() {
    const api = 'http://localhost:8082/sfs/services';
    return this.http.get(api);

  }

  getServices() {
    const api = 'http://localhost:8082/sfs/services';
    this.http.get(api).subscribe((e: any) => this.services = e);
    console.log(this.services);
    return this.services;
  }


  addService(service) {
    const api = 'http://localhost:8082/sfs/services';
    this.http.post(api, service).subscribe();
  }

}
