import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MytweetsComponent } from './components/mytweets/mytweets.component';
import { AlltweetsComponent } from './components/alltweets/alltweets.component';
import { LikedtweetsComponent } from './components/likedtweets/likedtweets.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { ShortTextPipe } from './pipes/short-text.pipe';
import { TweetUpdateComponent } from './components/tweet-update/tweet-update.component';
import { ShowReplyComponent } from './components/show-reply/show-reply.component';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    LoginComponent,
    NotFoundComponent,
    MytweetsComponent,
    AlltweetsComponent,
    LikedtweetsComponent,
    RegisterComponent,
    ShortTextPipe,
    TweetUpdateComponent,
    ShowReplyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
