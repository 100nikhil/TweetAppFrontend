import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username:string;
  searchedUser?:User;
  cu:string;


  constructor(private http:HttpClient, private route:ActivatedRoute) {
    this.username = this.route.snapshot.queryParams['username'];
    this.cu = localStorage.getItem("email")||"";
  }

  ngOnInit(): void {
    this.http.get(`http://localhost:8080//api/v1.0/tweets/user/search/${this.username}`).subscribe(
      res => {
        this.searchedUser = {...(res as User)};
        console.log(this.searchedUser);
      }
    );    
  }

  check(likes:string[]){

    let f;
    if(likes){
      f = likes.find(l => l===this.cu);
    }

    if(f){
      return true;
    }
    else{
      return false;
    }

  }

}
