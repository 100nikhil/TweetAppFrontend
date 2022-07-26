import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Tweet } from 'src/app/models/tweet';

@Component({
  selector: 'app-alltweets',
  templateUrl: './alltweets.component.html',
  styleUrls: ['./alltweets.component.css']
})
export class AlltweetsComponent implements OnInit {

  allTweets:Tweet[] = [];

  constructor(private http: HttpClient) { }

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

}
