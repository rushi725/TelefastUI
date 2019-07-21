import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private _http: HttpClient) { }


  getStatus() {
    const apiUrl = 'http://localhost:8081/sfs/orderedTask/status';
    return this._http.get(apiUrl);
  }

}
