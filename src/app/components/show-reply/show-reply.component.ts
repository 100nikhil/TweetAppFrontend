import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tweet } from 'src/app/models/tweet';

@Component({
  selector: 'app-show-reply',
  templateUrl: './show-reply.component.html',
  styleUrls: ['./show-reply.component.css']
})
export class ShowReplyComponent implements OnInit {

  concernedTweet:Tweet = {
    tid:'',
    email:'',
    tweet:'',
    likes:[],
    created:new Date(),
    replies:[]
  };
  arr:Tweet[]=[];
  tid:string;
  username:string;
  cuser:string;

  @ViewChild('rf') replyForm?: NgForm;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.tid = this.route.snapshot.params['tid'];
    this.cuser = localStorage.getItem("email")||"";
    this.username = this.route.snapshot.params['tu'];
  }

  ngOnInit(): void {
    this.fetchTweets();
  }

  fetchTweets(){
    this.http.get('http://localhost:8080/api/v1.0/tweets').subscribe(
      res => {
        for(let index in res){
          this.arr.push({...(res as Tweet[])[+index]});
        }
        
        this.concernedTweet = this.arr.find(el => el.tid === this.tid)||{
          tid:'',
          email:'',
          tweet:'',
          likes:[],
          created:new Date(),
          replies:[]
        };
      },
      err => {
        console.log(err);
      }
    );
  }

  postReply(){

    const reply = this.replyForm?.value.reply;

    this.http.post(`http://localhost:8080/api/v1.0/tweets/${this.username}/reply/${this.tid}`,
      {email:this.cuser , reply:reply}
    ).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );

    this.replyForm?.reset();
    //this.router.navigate(['allTweets']);
    this.arr = [];
    setTimeout(() => {
      this.fetchTweets();
    },50);
  }


  
  check(likes:string[]){
    
    let f;

    if(likes){
      f = likes.find(l => l===this.cuser);
    }

    if(f){
      return true;
    }
    else{
      return false;
    }

  }

}
