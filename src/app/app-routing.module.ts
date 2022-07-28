import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { LoginGuardService } from './auth/login-guard.service';
import { AlltweetsComponent } from './components/alltweets/alltweets.component';
import { LikedtweetsComponent } from './components/likedtweets/likedtweets.component';
import { LoginComponent } from './components/login/login.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { MytweetsComponent } from './components/mytweets/mytweets.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { ShowReplyComponent } from './components/show-reply/show-reply.component';
import { TweetUpdateComponent } from './components/tweet-update/tweet-update.component';

const routes: Routes = [
  {path:'', redirectTo:'/mainpage' ,pathMatch:'full'},
  {path:'mainpage', component:MainpageComponent, canActivate:[AuthGuardService]},
  {path:'login', component:LoginComponent, canActivate:[LoginGuardService]},
  {path:'allTweets', component:AlltweetsComponent, canActivate:[AuthGuardService]},
  {path:'updateTweet/:id', component:TweetUpdateComponent},
  {path:'showReplies/:tid/:tu', component:ShowReplyComponent},
  {path:'myTweets', component:MytweetsComponent, canActivate:[AuthGuardService]},
  {path:'likedTweets', component:LikedtweetsComponent, canActivate:[AuthGuardService]},
  {path:'register', component:RegisterComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }