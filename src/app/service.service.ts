import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient, private router: Router ) { }

  services: Array<any> = [];

  currentService = null;
  getServicesStream() {
    const api = 'http://localhost:8081/sfs/services';
    return this.http.get(api);

  }

  getServices() {
    const api = 'http://localhost:8081/sfs/services';
    this.http.get(api).subscribe((e: any) => this.services = e);
    console.log(this.services);
    return this.services;
  }


  addService(service) {
    const api = 'http://localhost:8081/sfs/services';
    this.http.post(api, service).subscribe((e: any) => {
      this.currentService = e,
        this.router.navigate(['/cworkflow'], {
          // queryParams: { service: this.currentService  }
          state: { service: this.currentService }
        });
    });
  }

}
