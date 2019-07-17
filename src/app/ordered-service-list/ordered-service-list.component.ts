import { Component, OnInit, Input } from '@angular/core';
import { OrderedServiceService } from '../ordered-service.service';


@Component({
  selector: 'app-ordered-service-list',
  templateUrl: './ordered-service-list.component.html',
  styleUrls: ['./ordered-service-list.component.scss']
})
export class OrderedServiceListComponent implements OnInit {

  constructor() { }
  @Input('value') orderedServices;
  @Input('type') type;

  ngOnInit(){

  }
}
