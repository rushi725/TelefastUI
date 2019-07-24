import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderedServiceService } from '../ordered-service.service';

@Component({
  selector: 'app-view-ordered-services',
  templateUrl: './view-ordered-services.component.html',
  styleUrls: ['./view-ordered-services.component.scss']
})
export class ViewOrderedServicesComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private orderedService: OrderedServiceService) { }
  orderedServices: Array<any>;
  type;
  projectId;

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // {order: "popular"}
        this.projectId = params.projectId;
        this.type = params.type;
        this.orderedService.loadOrderedServices(this.type, this.projectId);

        this.orderedService.getOrderedServiceStream(this.type).subscribe((e: any) => this.orderedServices = e);
      });
  }

}
