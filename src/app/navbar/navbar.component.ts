import { Component, OnInit} from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user =''
  role=''
  constructor(private userService:UserService) { }
  


  ngOnInit() {
  
  }
  ngDoCheck(){
    this.user=this.userService.getUser()
  this.role=this.userService.getRoles()
  }
  
  handleLogout(){
    this.user=""
    this.userService.doLogout()
    window.location.reload()
  }
}
