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
  type = 'PROJECT MANAGER';
  projectManagerId=5;

  constructor(private orderedService: OrderedServiceService,
              private service: ServiceService,
              private modalService: NgbModal) { }


  ngOnInit() {
    if(this.orderedServices.length!=0){
      this.serviceExists=true;
    }

    this.orderedService.loadOrderedServices(this.type,this.projectManagerId);

    this.orderedService.getOrderedServiceStream(this.type)
    .subscribe((resoponse:any)=>{
      this.orderedServices=resoponse;
    })
  }

  ngDoCheck(){
    this.orderedServices = this.orderedService.getOrderedServices(this.type);
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
