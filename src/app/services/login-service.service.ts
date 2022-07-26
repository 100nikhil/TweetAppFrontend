import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  isLoggedIn: boolean = !!localStorage.getItem('token');
  loggedIn: Subject<boolean>;
  currentUser: BehaviorSubject<string>;

  ob!:Observable<Object>;

  constructor(private http: HttpClient, private router: Router) {
    this.loggedIn = new Subject<boolean>();
    this.currentUser = new BehaviorSubject<string>('');
  }

  login(userDetails: { email: string; password: string }) {
    this.http
      .post('http://localhost:8080/api/v1.0/tweets/login', userDetails, {
        headers: new HttpHeaders({
          hahaha: 'hehehehehe hhe hehhehe heehhehheee',
        }),
        observe: 'response',
      })
      .subscribe(
        (res) => {
          console.log(res);
          console.log(res.status);
          if (res.status === 200) {
            localStorage.removeItem('email');
            localStorage.setItem('token', 'I am logged in');
            this.isLoggedIn = true;
            this.loggedIn.next(true);
          }
        },
        (err) => {
          console.log(err);
          console.log(err.error);
        }
      );
  }

  register(enteredUser: User) {
    this.http
      .post('http://localhost:8080/api/v1.0/tweets/register', enteredUser, {
        headers: new HttpHeaders({ hahaha: 'Register this user' }),
        observe: 'response',
      })
      .subscribe(
        (res) => {
          console.log(res);
          console.log(res.status);
        },
        (err) => {
          console.log(err);
          console.log(err.error);
        }
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.isLoggedIn = false;
    this.loggedIn.next(false);
    console.log('...inside logout of service');
    this.router.navigate(['/login']);
  }

  getStatus() {
    if (!!localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  addTweet(t: { tweet: any }) {
    const cu = localStorage.getItem('email');

    this.http
      .post(`http://localhost:8080/api/v1.0/tweets/${cu}/add`, t, {
        observe: 'response',
      })
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  likeTweet(id:string) {
    const cu = localStorage.getItem('email');

    this.ob = this.http.put(
      `http://localhost:8080/api/v1.0/tweets/${cu}/like/${id}`,
      {
        observe: 'response',
      }
    );
    
    return this.ob;

  }


}
