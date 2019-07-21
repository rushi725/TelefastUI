import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http: HttpClient) { }

  projectStream: Subject<any> = new Subject();
  addProject(project) {
    console.log('inside project service');
    console.log(project);
    const apiUrl = 'http://localhost:8081/sfs/projects';
    this._http.post(apiUrl, project)
      .subscribe(e => {
        this.projectStream.next({project: e});
      });
  }

  getProjectStream() {
    return this.projectStream;
  }

  getProjectByManager(projectManagerId) {
    const api = `http://localhost:8081/sfs/projects/${projectManagerId}`;
    return this._http.get(api);
  }
}
