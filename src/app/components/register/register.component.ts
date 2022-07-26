import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('signUpForm') signUpForm?: NgForm;
  enteredUser:User;

  constructor(private ls: LoginServiceService) { 
    this.enteredUser = {
      id:0,
      email:'',
      password:'',
      firstName:'',
      lastName:'',
      gender:'',
      dob:new Date()
    };
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.signUpForm?.value);
    if(this.signUpForm){
      this.enteredUser.email = this.signUpForm.value.email;
      this.enteredUser.password = this.signUpForm.value.password;
      this.enteredUser.firstName = this.signUpForm.value.firstname;
      this.enteredUser.lastName = this.signUpForm.value.lastname;
      this.enteredUser.gender = this.signUpForm.value.gender;
      this.enteredUser.dob = this.signUpForm.value.dob;
    }
    this.ls.register(this.enteredUser);
    this.signUpForm?.reset();
  }

}
