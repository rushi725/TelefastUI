import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  @Input("value") ser;

  hidden=true;

  toggle(){
    this.hidden = !this.hidden;
  }

  constructor() { }

  ngOnInit() {
  }

}
