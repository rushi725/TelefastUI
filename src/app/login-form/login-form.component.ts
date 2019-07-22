import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  message = ''
  role=''
  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }


  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }
  ngDoCheck(){
    this.role=this.userService.getRoles()
  }
  handleFormSubmit(event) {
    if (this.loginForm.valid) {
      let credentials = this.loginForm.value;
      this.userService.doLogin(credentials);
    
      }
    }
  }




