import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private _http: HttpClient,
              private router: Router) { }

  projects: Array<any>;

  projectStream: Subject<any> = new Subject();
  addProject(project) {
    console.log('inside project service');
    console.log(project);
    const apiUrl = 'http://localhost:8081/sfs/projects';
    this._http.post(apiUrl, project)
      .subscribe(e => {
        this.projects.push(e);
       // this.projectStream.next(this.projects);
        this.router.navigate(['/addService'], {
          // queryParams: { service: this.currentService  }
          state: { project: e}
        });
      });
  }

  getProjectStream() {
    return this.projectStream;
  }

  getProjectByManager(projectManagerId) {
    const api = `http://localhost:8081/sfs/projects/${projectManagerId}`;
    this._http.get(api).subscribe((e: any) => this.projects = e);
    return this._http.get(api);
  }
}
