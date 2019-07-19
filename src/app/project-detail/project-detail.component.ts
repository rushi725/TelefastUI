import { Component, OnInit, Input } from '@angular/core';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  @Input("value") value;
  @Input("type") type;

  constructor(private router:Router) { }
  public isCollapsed = true;

  ngOnInit() {
  }

  handleClick(event){
    this.isCollapsed= !this.isCollapsed;
    this.router.navigate(['orderedServices'],{
      queryParams: {refresh: new Date().getTime()}
    })
  }

}
