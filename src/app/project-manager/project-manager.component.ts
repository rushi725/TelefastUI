import { Component, OnInit } from '@angular/core';
import { OrderedServiceService } from '../ordered-service.service';
import { ServiceService } from '../service.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-manager',
  templateUrl: './project-manager.component.html',
  styleUrls: ['./project-manager.component.scss']
})
export class ProjectManagerComponent implements OnInit {

  serviceExists=true;
  orderedServices:any= [];
  type = 'Project Manager';
  projectManagerId=5;

  constructor(private orderService: OrderedServiceService,
              private service: ServiceService,
              private modalService: NgbModal) { }


  ngOnInit() {
    if(this.orderedServices.length!=0){
      this.serviceExists=true;
    }
    this.orderedServices = this.orderService.getOrderedServiceList();
    this.orderService.getOrderedService()
    this.orderService. getorderServiceStream()
    .subscribe(e => this.orderedServices.concat(e));
  }

  closeResult: string;

  // open(content) {
  //   console.log("Modal open")
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }


}
