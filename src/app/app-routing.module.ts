import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponentComponent } from './auth-component/auth-component.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { NewsComponent } from './main-body/news-list/news-list-item/news/news.component';
import { ProfileComponent } from './main-body/profile/profile.component';
import { AuthGuard } from './services/auth-guard.service';
import { UserGuard } from './services/user-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainBodyComponent },
  { path: 'auth', component: AuthComponentComponent, canActivate: [AuthGuard] },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: ':id', canActivate: [UserGuard], component: ProfileComponent },
    ],
  },
  { path: 'news/:id', component: NewsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
