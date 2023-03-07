import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsListComponent } from './main-body/news-list/news-list.component';
import { NewsListItemComponent } from './main-body/news-list/news-list-item/news-list-item.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { HeadereComponent } from './headere/headere.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthComponentComponent } from './auth-component/auth-component.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './main-body/sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { NewsComponent } from './main-body/news-list/news-list-item/news/news.component';
import { SearchComponent } from './main-body/search/search.component';
import { BookComponent } from './book/book.component';
import { BookCommentComponent } from './book/book-comment/book-comment.component';
import { ReviewsComponent } from './main-body/reviews/reviews.component';
import { ReviewItemComponent } from './main-body/reviews/review-item/review-item.component';
import { ShortPipe } from './services/short.pipe';
import { ReviewPageComponent } from './review-page/review-page.component';
import { AllReviewPageComponent } from './all-review-page/all-review-page.component';
import { NewReviewComponent } from './all-review-page/new-review/new-review.component';
import { ReviewProfileItemComponent } from './main-body/profile/profile-page/review-profile-item/review-profile-item.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfilePageComponent } from './main-body/profile/profile-page/profile-page.component';
import { ProfileComponent } from './main-body/profile/profile.component';
import { BookProfileItemComponent } from './main-body/profile/profile-page/book-profile-item/book-profile-item.component';
import { BookEditComponent } from './book/book-edit/book-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadereComponent,
    MainBodyComponent,
    NewsListComponent,
    NewsListItemComponent,
    SidebarComponent,
    AuthComponentComponent,
    ProfileComponent,
    FooterComponent,
    NewsComponent,
    ShortPipe,
    SearchComponent,
    BookComponent,
    BookCommentComponent,
    ReviewsComponent,
    ReviewItemComponent,
    ReviewPageComponent,
    AllReviewPageComponent,
    NewReviewComponent,
    ReviewProfileItemComponent,
    EditProfileComponent,
    ProfilePageComponent,
    BookProfileItemComponent,
    BookEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
