import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from './services/login-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'TweetApp';
  loggedIn!:boolean;

  constructor(private ls: LoginServiceService, private router:Router){

  }

  ngOnInit(): void {
    
  }

  logout(){
    this.ls.logout();
  }

}
