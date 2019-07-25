import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OrderedServiceService } from '../ordered-service.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.scss']
})
export class AddServiceComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private orderedService: OrderedServiceService) { }
  type = 'PROJECT MANAGER';
  project = null;
  orderedServices: Array<any>;

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.project = paramMap.get('project');
    });
    // this.activatedRoute.paramMap.pipe(map(() => window.history.state);
    this.project = window.history.state.project;

    this.orderedService.loadOrderedServices(this.type, this.project.projectId);
    this.orderedService.getOrderedServiceStream(this.type).subscribe((e: any) => this.orderedServices = e);
  }

}
