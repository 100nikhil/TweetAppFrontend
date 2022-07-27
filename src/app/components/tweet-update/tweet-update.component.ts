import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-tweet-update',
  templateUrl: './tweet-update.component.html',
  styleUrls: ['./tweet-update.component.css']
})
export class TweetUpdateComponent implements OnInit {

  tid!:string;
  currentTweet!:string;

  @ViewChild('tuf') updateForm ?: NgForm;

  constructor(private ls:LoginServiceService, private router: Router, private route: ActivatedRoute) {
    this.currentTweet = this.router.getCurrentNavigation()?.extras.state?.data;
  }

  ngOnInit(): void {
    this.tid = this.route.snapshot.params['id'];
    console.log(this.tid, this.currentTweet);

  }

  updateTweet(){
    console.log(this.currentTweet);
    this.ls.updateTweet({tid: this.tid, tweet: this.currentTweet}).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/myTweets']);
      },
      err => {
        console.log(err);
      }
    )
  }

}
