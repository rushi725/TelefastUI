import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TelefastUI';
  constructor(private router: Router, private route: ActivatedRoute) { }


  ngOnInit(){
    this.router.navigate([{outlets: {primary: 'dashboard'}}], 
    {relativeTo: this.route});
  }
}
