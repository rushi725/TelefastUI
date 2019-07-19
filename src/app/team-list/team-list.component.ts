import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  constructor(private teamService: TeamService, private modalService: NgbModal) { }
  isCollapsed = false;
  teams = [];

  closeResult: string;


  // ngDoCheck() {

  //   this.teamService.getTeamStream().subscribe((e: any) => {
  //     this.teams = e;
  //   });
  // }

  ngOnInit() {
    this.teamService.getTeamStream().subscribe((e: any) => {
        this.teams = e ;
    });
  }

  open(content) {
    console.log('Modal open');
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
