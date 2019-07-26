import { Component, OnInit} from '@angular/core';
import { UserService } from '../user.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user = ''
  role = ''
  employee;
  firstName = '';
  lastName = '';
  pathUrl;
  constructor(private userService: UserService) { }

  ngOnInit() {
    if (this.userService.isUserLoggedIn()) {
      this.getLoginDetail();
    }
    this.userService.getUserStream()
    .subscribe((e: any) => {
        if (e.isLoggedIn) {
          this.getLoginDetail();
        }
    });
  }
  handleLogout(){
    this.user = ""
    this.userService.doLogout()
    this.lastName = ''
    this.firstName = ''
    // window.location.reload()
  }

  getLoginDetail() {
    this.employee = this.userService.getEmployee();
    this.firstName = this.employee.firstName;
    this.lastName = this.employee.lastName;
    this.user = this.userService.getUser();
    this.role = this.userService.getRoles();
    switch (this.role) {
      case 'ROLE_PRODUCT_MANAGER': this.pathUrl = 'dashboard';
        break;
      case 'ROLE_PROJECT_MANAGER': this.pathUrl = 'orderedServices';
        break;
      case 'ROLE_SERVICE_MANAGER': this.pathUrl = 'serviceManager';
        break;
      case 'ROLE_TEAM_MANAGER': this.pathUrl = 'orderedTasks';
        break;
      case 'ROLE_TEAM_MEMBER': this.pathUrl = 'orderedTask';
        break;
      case 'ROLE_SUPER': this.pathUrl = 'employee';
        break;
      default:
        break;
    }
  }
}
