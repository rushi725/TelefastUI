import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loginForm: FormGroup;
  message;
  role = ''
  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }


  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

    this.userService.getUserStream()
    .subscribe((e: any) => {
      if (e.isLoggedIn){
        this.role = this.userService.getRoles();
      }
      else {
        this.message = "Invalid Username or Password";
      }
    })
  }
  // ngDoCheck() {
  //   this.role = this.userService.getRoles()
  // }
  handleFormSubmit(event) {
    if (this.loginForm.valid) {
      let credentials = this.loginForm.value;
      this.userService.doLogin(credentials);
    }
  }
}
