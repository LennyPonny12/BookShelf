import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsListComponent } from './main-body/news-list/news-list.component';
import { NewsListItemComponent } from './main-body/news-list/news-list-item/news-list-item.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { SidebarComponent } from './main-body/sidebar/sidebar.component';
import { HeadereComponent } from './headere/headere.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthComponentComponent } from './auth-component/auth-component.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeadereComponent,
    MainBodyComponent,
    NewsListComponent,
    NewsListItemComponent,
    SidebarComponent,
    AuthComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
