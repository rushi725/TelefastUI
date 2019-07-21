import { Injectable } from '@angular/core';
import { WorkflowService } from './workflow.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkflowResolverService implements Resolve<any> {

  constructor(private workflowService: WorkflowService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    console.log('resolving...')
    return this.workflowService.getWorkFlow(91, 100);
  }
}
