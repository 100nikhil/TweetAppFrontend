import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Tweet } from 'src/app/models/tweet';

@Component({
  selector: 'app-likedtweets',
  templateUrl: './likedtweets.component.html',
  styleUrls: ['./likedtweets.component.css']
})
export class LikedtweetsComponent implements OnInit {

  likedTweets:Tweet[] = [];
  //allTweets:Tweet[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(`http://localhost:8080/api/v1.0/tweets/`).subscribe(
      (res) => {
        console.log(res);
        for(const index in res){
          if((res as Tweet[])[+index].like){
            this.likedTweets.push({...(res as Tweet[])[+index]});
          }
        }
      }
    );
  }

}
