import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OrderedServiceService } from '../ordered-service.service';
import { BindingFlags } from '@angular/compiler/src/core';


@Component({
  selector: 'app-ordered-service-list',
  templateUrl: './ordered-service-list.component.html',
  styleUrls: ['./ordered-service-list.component.scss']
})
export class OrderedServiceListComponent implements OnInit {

  constructor(private modalService: NgbModal,
              private orderedServiceService:OrderedServiceService) { }
  @Input('value') orderedServices;
  @Input('type') type;
  @Input('project') project;
  @Input('flag') flag;
  isServiceStarted=false;

  ngOnInit(){

    console.log("sssssssssssssssssss")
    console.log(this.flag);

    console.log("project---->")
    console.log(this.project);

    this.orderedServiceService.getOrderedServiceStream(this.type)
    .subscribe((response:any)=>{
      this.orderedServices = response;
    })
  }

  closeResult: string;

  open(content) {
    console.log('Modal open');
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  startService(orderedServiceId){
    this.isServiceStarted=true;
    this.orderedServiceService.startService(orderedServiceId);
  }

}
