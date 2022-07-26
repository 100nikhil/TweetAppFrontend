import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  @ViewChild('f') loginForm?: NgForm;

  constructor(private ls: LoginServiceService, private router: Router ) {
  }

  ngOnInit(): void {
    
  }

  onSubmit(){
    console.log(this.loginForm);
    console.log(this.loginForm?.value.email);
    console.log(this.loginForm?.value.password);

    this.ls.login({email:this.loginForm?.value.email, password:this.loginForm?.value.password});
    this.ls.currentUser.next(this.loginForm?.value.email);
    this.loginForm?.reset();

    
    this.ls.loggedIn.subscribe(val =>{
      if(val){
        this.router.navigate(['/']);
      }
    });
  }

}
