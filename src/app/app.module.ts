import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadereComponent } from './headere/headere.component';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsListItemComponent } from './news-list/news-list-item/news-list-item.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadereComponent,
    NewsListComponent,
    NewsListItemComponent,
    SidebarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
