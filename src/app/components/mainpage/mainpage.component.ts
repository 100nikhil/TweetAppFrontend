import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/models/tweet';
import { User } from 'src/app/models/user';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  allUsers:User[] = [];
  userNames:string[]=[];
  allTweets:Tweet[]=[];
  current!:string|null;
  cuser:User={  
    id:1,
    firstName:"",
    lastName:"",
    gender:"",
    dob:new Date(),
    email:"",
    password:"",
    tweets: [],
  };

  @ViewChild('tf') tweetForm?: NgForm;

  constructor(private http: HttpClient, private ls: LoginServiceService, private router: Router) {
    this.ls.currentUser.subscribe(val => {
      if(!!localStorage.getItem("email")){
        this.current = localStorage.getItem("email");
      }
      else{
        if(!!val){
          localStorage.setItem("email",val);
        }
        this.current = val;
      }
    });
  }

  ngOnInit(): void {

    this.http.get("http://localhost:8080//api/v1.0/tweets/users").subscribe(
      res => {
        //console.log(res);
        for(const index in res){
          this.allUsers.push({...(res as User[])[+index]});
        }
        console.log(this.allUsers);
        //--------- getting all tweets --------
        for(let u of this.allUsers){
          this.userNames.push(u.firstName);
          for(let t of u.tweets||[]){
            this.allTweets.push(t);
          }
        }
        //------ storing current user ------
        const c1 = this.allUsers.find(u => u.email===this.current);
        if(c1){
          this.cuser.id = c1.id;
          this.cuser.firstName = c1.firstName;
          this.cuser.lastName = c1.lastName;
          this.cuser.gender = c1.gender;
          this.cuser.dob = c1.dob;
          this.cuser.email = c1.email;
          this.cuser.password = c1.password;
          this.cuser.tweets = c1.tweets;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getCurrent(){
    return this.current;
  }

  onSubmit(){
    console.log(this.tweetForm);
    console.log(this.tweetForm?.value.tweet);
    this.ls.addTweet({tweet: this.tweetForm?.value.tweet});
    this.tweetForm?.reset();
  }

  toggleTweet(el:any, id:string){
    console.log(el.target.classList.toggle('active'));

    this.ls.likeTweet(id).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  check(likes:string[]){

    const cu = this.getCurrent();
    let f;
    if(likes){
      f = likes.find(l => l===cu);
    }

    if(f){
      return true;
    }
    else{
      return false;
    }

  }
}


