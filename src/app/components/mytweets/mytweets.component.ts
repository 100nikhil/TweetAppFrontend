import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Tweet } from 'src/app/models/tweet';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-mytweets',
  templateUrl: './mytweets.component.html',
  styleUrls: ['./mytweets.component.css']
})
export class MytweetsComponent implements OnInit {

  myTweets:Tweet[] = [];
  cuser:string;

  constructor(private http: HttpClient, private ls: LoginServiceService) {
    this.cuser = localStorage.getItem("email")||"";
  }

  ngOnInit(): void {
    this.fetchdata();
  }

  fetchdata(){
    this.http.get(`http://localhost:8080/api/v1.0/tweets/${this.cuser}`).subscribe(
      (res) => {
        console.log(res);
        for(const index in res){
          this.myTweets.push({...(res as Tweet[])[+index]});
        }
      }
    );
  }

  delete(id:string){
    this.http.delete(`http://localhost:8080/api/v1.0/tweets/${this.cuser}/delete/${id}`).subscribe(
      (res) => {
        console.log(res);
      }
    );
    this.myTweets = [];
    setTimeout(() => {
      this.fetchdata();
    },10);
  }

}
