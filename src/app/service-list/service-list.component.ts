import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ServiceService } from '../service.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceListComponent implements OnInit {
services = [];
  constructor(private service: ServiceService,private modalService: NgbModal) { }
  isCollapsed = false;

  ngOnInit() {
    this.services = this.service.getServices();
    this.service.getServicesStream().subscribe(e=>{
        this.services.concat(e);
    })

  }
  closeResult: string;
  open(content) {
    console.log("Modal open")
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
      return  `with: ${reason}`;
    }
  }


}
