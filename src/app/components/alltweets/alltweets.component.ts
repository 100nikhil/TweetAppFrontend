import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tweet } from 'src/app/models/tweet';

@Component({
  selector: 'app-alltweets',
  templateUrl: './alltweets.component.html',
  styleUrls: ['./alltweets.component.css']
})
export class AlltweetsComponent implements OnInit {

  allTweets:Tweet[] = [];
  cuser?:string = localStorage.getItem("email")||"";

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/api/v1.0/tweets').subscribe(
      (res) => {
        console.log(res);
        for(const index in res){
          this.allTweets.push({...(res as Tweet[])[+index]});
        }
      }
    );
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
