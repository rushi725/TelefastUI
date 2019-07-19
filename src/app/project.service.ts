import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http: HttpClient) { }

  addProject(project) {
    console.log("inside project service")
    console.log(project)
    let apiUrl = "http://localhost:8081/sfs/projects";
    this._http.post(apiUrl, project)
      .subscribe(e => {
      })
  }
}
