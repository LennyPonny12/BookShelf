import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllReviewPageComponent } from './all-review-page/all-review-page.component';
import { NewReviewComponent } from './all-review-page/new-review/new-review.component';
import { AuthComponentComponent } from './auth-component/auth-component.component';
import { BookComponent } from './book/book.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { NewsComponent } from './main-body/news-list/news-list-item/news/news.component';
import { ProfilePageComponent } from './main-body/profile/profile-page/profile-page.component';
import { ProfileComponent } from './main-body/profile/profile.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { AuthGuard } from './services/auth-guard.service';
import { canEdit } from './services/canEdit.guard';
import { isLogged } from './services/isLogged.guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainBodyComponent },
  { path: 'auth', component: AuthComponentComponent, canActivate: [AuthGuard] },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: ':id/edit',
        component: EditProfileComponent,
        canActivate: [isLogged, canEdit],
      },
      { path: ':id', component: ProfilePageComponent },
    ],
  },
  { path: 'news/:id', component: NewsComponent },
  { path: 'book/:id', component: BookComponent },
  { path: 'review/:id', component: ReviewPageComponent },
  {
    path: 'reviews',
    component: AllReviewPageComponent,
  },
  {
    path: 'newReview',
    canActivate: [isLogged],
    component: NewReviewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
