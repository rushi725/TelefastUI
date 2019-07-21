import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OrderedServiceService } from '../ordered-service.service';


@Component({
  selector: 'app-ordered-service-list',
  templateUrl: './ordered-service-list.component.html',
  styleUrls: ['./ordered-service-list.component.scss']
})
export class OrderedServiceListComponent implements OnInit {

  constructor(private modalService: NgbModal) { }
  @Input('value') orderedServices;
  @Input('type') type;
  @Input('project') project;

  ngOnInit(){

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
}
